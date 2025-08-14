import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://consoltech.shop',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, authorization',
  'Vary': 'Origin'
}

interface ContactRequest {
  name: string
  email: string
  company?: string
  subject: string
  message: string
  recaptchaToken?: string
  honeypot?: string
  pageUrl?: string
  timestamp?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
    })
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ ok: false, error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get request data as JSON
    const data: ContactRequest = await req.json()

    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown'

    // Honeypot spam check
    if (data.honeypot) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Spam detected' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid email format' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Rate limiting check (5 per hour per IP)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count } = await supabaseClient
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .gte('created_at', oneHourAgo)

    if (count && count >= 5) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify reCAPTCHA if token provided
    const recaptchaToken = data.recaptchaToken
    const recaptchaSecret = Deno.env.get('RECAPTCHA_SECRET_KEY')
    
    if (recaptchaToken && recaptchaSecret) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`
      })
      
      const recaptchaResult = await recaptchaResponse.json()
      
      if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
        return new Response(
          JSON.stringify({ ok: false, error: 'reCAPTCHA verification failed' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    }

    // Store submission in database
    const { error: dbError } = await supabaseClient
      .from('contact_messages')
      .insert({
        name: data.name,
        email: data.email,
        company: data.company,
        subject: data.subject,
        message: data.message,
        ip_address: clientIP,
        created_at: new Date().toISOString()
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ ok: false, error: 'Failed to store message' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Send email using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (resendApiKey) {
      const emailData = {
        from: 'no-reply@consoltech.shop',
        to: ['sales@consoltech.shop'],
        reply_to: data.email,
        subject: `New Contact Form: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toISOString()}</small></p>
        `
      }

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      })

      if (!emailResponse.ok) {
        console.error('Email sending failed:', await emailResponse.text())
      }

      // Send auto-response to user
      const autoResponseData = {
        from: 'no-reply@consoltech.shop',
        to: [data.email],
        subject: 'We received your message – Consoltech',
        html: `
          <h2>Thank you for contacting Consoltech!</h2>
          <p>Hi ${data.name},</p>
          <p>We have received your message regarding "${data.subject}" and will get back to you shortly.</p>
          
          <h3>Your Message Details:</h3>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong> ${data.message}</p>
          
          <p>Our team typically responds within 24 hours during business days.</p>
          
          <p>Best regards,<br>
          The Consoltech Team</p>
          
          <hr>
          <p><small>This is an automated message. Please do not reply to this email.</small></p>
        `
      }

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(autoResponseData)
      })
    }

    return new Response(
      JSON.stringify({ ok: true, message: 'Message sent successfully' }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(
      JSON.stringify({ ok: false, error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})