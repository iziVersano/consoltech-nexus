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
          <p className="text-lg text-muted-foreground mt-4">
            Welcome to Consoltech – Global Import & Distribution Experts in Consumer Electronics and Gaming
          </p>
        </header>

        <section className="max-w-3xl mx-auto space-y-6 text-base leading-7 text-muted-foreground">
          <p>
            Established in 2001 and headquartered in Tel Aviv, Israel, Consoltech is a leading importer, exporter, and
            distributor of consumer electronics, IT products, gaming consoles and accessories, electric bikes, branded
            toys, and gadgets. With over two decades of experience, we proudly serve a wide range of global markets with
            a special focus on the Middle East, delivering innovative and high-demand products to retailers, resellers,
            and wholesale clients.
          </p>
          <p>
            As a VIP+ member on{' '}
            <a href="https://www.handelot.com" target="_blank" rel="noopener noreferrer" className="underline">
              Handelot
            </a>
            , we maintain strong global partnerships and uphold a reputation for reliability, transparency, and efficient
            logistics.
          </p>
          <p>
            We source and distribute from major regions including Europe, the United States, the Middle East, and Asia
            (Hong Kong, China, Singapore, Korea). Our supply chain is designed for speed and flexibility, enabling us to
            meet the evolving needs of the electronics and gaming markets.
          </p>
          <p>
            At Consoltech, we are constantly looking to expand our network and welcome serious suppliers and buyers
            interested in long-term, mutually beneficial cooperation.
          </p>
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