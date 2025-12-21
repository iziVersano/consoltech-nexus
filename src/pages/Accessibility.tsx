import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Mail, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const Accessibility = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Accessibility Statement | Consoltech</title>
        <meta name="description" content="Consoltech's commitment to digital accessibility. Learn about our WCAG 2.1 Level AA compliance and how to contact us for accessibility support." />
      </Helmet>
      
      <Navigation />
      
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Accessibility Statement
            </h1>
            <p className="text-muted-foreground text-lg">
              Our commitment to digital accessibility for all users
            </p>
          </header>

          <article className="prose prose-invert max-w-none space-y-8">
            {/* Commitment Section */}
            <section aria-labelledby="commitment-heading" className="p-6 rounded-2xl bg-card/30 border border-border/50">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h2 id="commitment-heading" className="text-2xl font-semibold text-foreground mb-4">Our Commitment</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Consoltech is committed to ensuring digital accessibility for people with disabilities. 
                    We are continually improving the user experience for everyone and applying the relevant 
                    accessibility standards to ensure we provide equal access to all users.
                  </p>
                </div>
              </div>
            </section>

            {/* Conformance Status */}
            <section aria-labelledby="conformance-heading" className="p-6 rounded-2xl bg-card/30 border border-border/50">
              <h2 id="conformance-heading" className="text-2xl font-semibold text-foreground mb-4">Conformance Status</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and 
                developers to improve accessibility for people with disabilities. It defines three levels 
                of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Consoltech</strong> is partially conformant with 
                <strong className="text-primary"> WCAG 2.1 Level AA</strong>. Partially conformant means 
                that some parts of the content do not fully conform to the accessibility standard.
              </p>
            </section>

            {/* Accessibility Features */}
            <section aria-labelledby="features-heading" className="p-6 rounded-2xl bg-card/30 border border-border/50">
              <h2 id="features-heading" className="text-2xl font-semibold text-foreground mb-4">Accessibility Features</h2>
              <ul className="space-y-3 text-muted-foreground" role="list">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Keyboard navigation support throughout the website</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Skip to main content link for screen reader users</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Semantic HTML structure with proper heading hierarchy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Alternative text for meaningful images</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Sufficient color contrast ratios (WCAG 2.1 AA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Visible focus indicators for interactive elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Form labels and error messages for assistive technologies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Responsive design for various devices and screen sizes</span>
                </li>
              </ul>
            </section>

            {/* Feedback Section */}
            <section aria-labelledby="feedback-heading" className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h2 id="feedback-heading" className="text-2xl font-semibold text-foreground mb-4">Feedback & Contact</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We welcome your feedback on the accessibility of Consoltech. If you encounter any 
                    accessibility barriers or have suggestions for improvement, please contact us:
                  </p>
                  <a 
                    href="mailto:sales@consoltech.shop" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-1"
                  >
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    sales@consoltech.shop
                  </a>
                  <p className="text-muted-foreground mt-4 text-sm">
                    We aim to respond to accessibility feedback within 5 business days.
                  </p>
                </div>
              </div>
            </section>

            {/* Last Updated */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm pt-4">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Last updated: {currentDate}</span>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accessibility;

