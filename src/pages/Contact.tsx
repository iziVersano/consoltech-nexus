import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FORM_ENDPOINT = "https://formspree.io/f/xyzpvaeg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  // Prefill form from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get("subject");
    const message = params.get("message");

    if (subject || message) {
      setFormData(prev => ({
        ...prev,
        ...(subject && { subject }),
        ...(message && { message })
      }));
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Basic validation
    if (!data.name || !data.email || !/^\S+@\S+\.\S+$/.test(data.email as string) || !data.message) {
      toast({ variant: "destructive", title: "Please complete all required fields." });
      return;
    }

    // Honeypot check
    const hpValue = data._gotcha as string;
    if (hpValue) {
      // Silently ignore spam
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn?.setAttribute("disabled", "true");
    setIsSubmitting(true);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { 
          "Accept": "application/json", 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
      });

      // MIME/type guard to prevent parsing errors
      const ct = res.headers.get("Content-Type") || "";
      if (!res.ok || !ct.includes("application/json")) {
        throw new Error("Invalid response");
      }

      const json = await res.json();
      if (json.ok === true || json.success === true) {
        toast({ title: "Thank you! Your message has been sent.", description: "We will get back to you shortly." });
        form.reset();
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        throw new Error(json.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Network error", description: "Please try again." });
    } finally {
      btn?.removeAttribute("disabled");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@consoltech.shop', 'sales@consoltech.shop'],
      description: 'Get in touch via email for detailed inquiries'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+972-52-2768607'],
      description: '24/7 support for urgent matters'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['47 Moshe Sneh St., Tel Aviv 6930243, Israel'],
      description: 'Headquarters in Tel Aviv, Israel'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00-18:00', 'Weekend: On-call support'],
      description: 'We\'re here when you need us'
    }
  ];

  const offices = [
    {
      city: 'Tel Aviv',
      country: 'Israel',
      address: '47 Moshe Sneh St., Tel Aviv 6930243',
      phone: '+972-52-2768607',
      email: 'sales@gamestation.co.il'
    }
  ];

  const isSingleOffice = offices.length === 1;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-2 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to partner with us? Have questions about our products? 
              Our global team is here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="product-card">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form id="contactForm" onSubmit={handleSubmit} method="POST" className="space-y-6" noValidate>
                  {/* Honeypot field */}
                  <input type="text" name="_gotcha" style={{display:'none'}} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="products">Product Information</option>
                      <option value="distribution">Distribution Services</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
  
                  <Button type="submit" className="btn-hero w-full" disabled={isSubmitting} aria-disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="product-card p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                           <div className="space-y-1">
                             {info.details.map((detail, idx) => {
                               if (info.title === 'Call Us') {
                                 return (
                                   <div key={idx} className="contact-block flex flex-col gap-1">
                                     <a
                                       href="tel:+972522768607"
                                       className="contact-link contact-link--phone text-accent font-medium underline"
                                       aria-label="Call us on mobile at +972-52-2768607"
                                     >
                                       {detail} (Mobile)
                                     </a>
                                     <button
                                       id="whatsappLink"
                                       className="contact-link contact-link--whatsapp mt-1 inline-flex items-center gap-2 bg-transparent text-green-600 border-0 p-0 cursor-pointer font-semibold hover:opacity-90 transition-opacity"
                                       aria-label="Message us on WhatsApp"
                                     >
                                       <svg 
                                         width="18" 
                                         height="18" 
                                         viewBox="0 0 32 32" 
                                         aria-hidden="true" 
                                         focusable="false"
                                         className="wa-icon"
                                       >
                                         <path 
                                           fill="currentColor"
                                           d="M19.1 17.5c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.3-.4.2-.7.1c-2-1-3.3-2.6-3.8-3-.4-.4-.8-1-.5-1.5s.6-.9.8-1.2.2-.4 0-.7c-.1-.2-.7-1.8-.9-2.4s-.5-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.3 2.1 3.2 5 4.5.7.3 1.2.5 1.6.6.7.2 1.4.2 1.9.1.6-.1 1.8-.8 2-1.6.3-.8.3-1.4.2-1.6-.1-.2-.3-.2-.6-.3z"
                                         />
                                         <path 
                                           fill="currentColor"
                                           d="M27.1 4.9C24.3 2.1 20.7.6 16.9.6S9.6 2.1 6.8 4.9C1 10.8 1 20 6.8 25.9c2.8 2.8 6.4 4.3 10.2 4.3h.1c2.5 0 4.9-.6 7-1.8l4.6 1.2-1.3-4.5c1.3-2.2 2-4.7 2-7.2 0-3.7-1.5-7.3-4.3-10zM25 24.6l.2.2 0 .2.6 2-2- .5-.2-.1h-.2c-2 1.2-4.3 1.9-6.6 1.9-3.3 0-6.4-1.3-8.8-3.6C5 22.4 3.7 19.2 3.7 16S5 9.6 7.4 7.2c2.4-2.4 5.5-3.7 8.8-3.7s6.4 1.3 8.8 3.7c2.4 2.4 3.7 5.5 3.7 8.8 0 2.4-.7 4.7-2.1 6.6z"
                                         />
                                       </svg>
                                       <span>WhatsApp</span>
                                     </button>
                                   </div>
                                 );
                               }
                              if (info.title === 'Visit Us') {
                                const mapsQuery = encodeURIComponent(detail);
                                return (
                                  <a
                                    key={idx}
                                    href={`https://www.google.com/maps?q=${mapsQuery}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-medium underline"
                                  >
                                    {detail}
                                  </a>
                                );
                              }
                              return (
                                <p key={idx} className="text-accent font-medium">{detail}</p>
                              );
                            })}
                          </div>
                          <p className="text-muted-foreground text-sm mt-2">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="pt-8 pb-8 md:pt-12 md:pb-10 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Global Offices</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Headquartered in Tel Aviv, Israel.
            </p>
          </div>

          <div className={`grid gap-8 grid-cols-1 ${isSingleOffice ? 'md:grid-cols-1 md:max-w-md md:mx-auto' : 'md:grid-cols-3'}`}>
            {offices.map((office, index) => (
              <div key={index} className="product-card text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{office.city}</h3>
                <p className="text-accent font-medium mb-4">{office.country}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(`${office.address}, ${office.country}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline"
                    >
                      {office.address}
                    </a>
                    <a
                      href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                      className="text-foreground font-medium underline"
                    >
                      {office.phone}
                    </a>
                    <p className="text-accent">{office.email}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-6 md:pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What is your minimum order quantity?",
                answer: "Our MOQ varies by product category. For gaming consoles, it's typically 10-20 units. For accessories and smaller electronics, MOQ starts at 50 units. Contact us for specific product requirements."
              },
              {
                question: "Do you provide international shipping?",
                answer: "Yes, we ship to over 50 countries worldwide. We have partnerships with leading logistics providers to ensure fast, secure delivery with full tracking and insurance coverage."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept bank transfers, letters of credit, and for established clients, we offer flexible payment terms. All transactions are secured and comply with international trade standards."
              },
              {
                question: "Do you provide product warranties?",
                answer: "All our products come with manufacturer warranties. We also provide additional support and can facilitate warranty claims through our global service network."
              }
            ].map((faq, index) => (
              <div key={index} className="product-card">
                <h3 className="text-lg font-semibold mb-3 text-accent">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* WhatsApp Integration Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
        (function(){
          const WA_NUMBER = "972522768607";

          function buildWhatsAppMessage() {
            const title = document.title?.trim() || "your website";
            const url = location.href;
            return "Hello CONSOLTECH team,\\n" +
                   "I'd like to speak with someone regarding your products/services.\\n" +
                   "Page: " + title + "\\n" +
                   "URL: " + url + "\\n\\n" +
                   "Please let me know the best time to connect.\\nThank you.";
          }

          function openWhatsApp() {
            const text = encodeURIComponent(buildWhatsAppMessage());
            const url = "https://wa.me/" + WA_NUMBER + "?text=" + text;
            window.open(url, "_blank", "noopener");
          }

          document.addEventListener('DOMContentLoaded', function() {
            const whatsappLink = document.getElementById("whatsappLink");
            if (whatsappLink) {
              whatsappLink.addEventListener("click", openWhatsApp);
            }
          });
        })();
        `
      }} />
    </div>
  );
};

export default Contact;