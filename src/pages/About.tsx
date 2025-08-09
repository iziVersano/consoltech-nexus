import Navigation from '@/components/Navigation';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/about` : '/about';

  return (
    <div className="min-h-screen">
      <Navigation />
      <Helmet>
        <title>About Consoltech | Global Import & Distribution Experts</title>
        <meta
          name="description"
          content="About Consoltech: Global importer and distributor of consumer electronics and gaming since 2001. Based in Tel Aviv, serving worldwide suppliers and buyers."
        />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Consoltech",
            url: canonicalUrl.replace('/about', ''),
            description:
              "Global import, export, and distribution of consumer electronics and gaming since 2001.",
            email: "sales@gamestation.co.il",
            telephone: "+972-52-2768607",
            address: {
              "@type": "PostalAddress",
              streetAddress: "47 Moshe Sneh St.",
              addressLocality: "Tel Aviv",
              postalCode: "6930243",
              addressCountry: "IL",
            },
            areaServed: ["Europe", "United States", "Middle East", "Asia"],
            sameAs: ["https://www.handelot.com"],
          })}
        </script>
      </Helmet>

      <main className="container px-4 md:px-6 pt-24 pb-16">
        <header className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">About Consoltech</h1>
        </header>

        <section className="max-w-3xl mx-auto space-y-6 text-base leading-7 text-muted-foreground">
          <p>Founded in 2001 and headquartered in Tel Aviv, Israel.</p>
          <p>Consoltech is a trusted importer, exporter, and distributor of:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consumer electronics &amp; IT products</li>
            <li>Gaming consoles &amp; accessories</li>
            <li>Electric bikes &amp; branded toys</li>
            <li>Gadgets &amp; tech innovations</li>
          </ul>

          <p>We have over 20 years of experience.</p>
          <p>We proudly serve a wide range of global markets.</p>
          <p>Our main focus is the Middle East.</p>

          <p>We deliver innovative and high-demand products to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Retailers</li>
            <li>Resellers</li>
            <li>Wholesale clients</li>
          </ul>

          <p>As a VIP+ member on Handelot, we:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain strong global partnerships</li>
            <li>Uphold reliability and transparency</li>
            <li>Ensure efficient logistics</li>
          </ul>

          <p>We source and distribute from major regions:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Europe</li>
            <li>United States</li>
            <li>Middle East</li>
            <li>Asia (Hong Kong, China, Singapore, Korea)</li>
          </ul>

          <p>Our supply chain is designed for speed and flexibility.</p>
          <p>We meet the evolving needs of the electronics and gaming industries.</p>

          <p>At Consoltech, we are expanding our network.</p>
          <p>We welcome serious suppliers and buyers.</p>
          <p>We focus on long-term, mutually beneficial cooperation.</p>
        </section>

        <section className="max-w-4xl mx-auto mt-12" aria-labelledby="connect-heading">
          <h2 id="connect-heading" className="text-2xl md:text-3xl font-semibold mb-4">
            Let’s Connect
          </h2>
          <p className="mb-6">
            If you are a manufacturer, distributor, or wholesaler interested in doing business, please feel free to reach
            out with your company profile and updated price lists.
          </p>
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <span className="font-medium">Address:</span> 47 Moshe Sneh St., Tel Aviv 6930243, Israel
                </li>
                <li>
                  <span className="font-medium">Mobile / WhatsApp:</span> <a href="tel:+972522768607" className="underline">+972-52-2768607</a>
                </li>
                <li>
                  <span className="font-medium">Email:</span> <a href="mailto:sales@gamestation.co.il" className="underline">sales@gamestation.co.il</a>
                </li>
                <li>
                  <span className="font-medium">VAT Registration Number:</span> 032398497
                </li>
              </ul>
              <p className="mt-6 text-muted-foreground">
                We look forward to doing business with you!
                <br />– Rotem Sharon, Import Manager &amp; Business Development
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;