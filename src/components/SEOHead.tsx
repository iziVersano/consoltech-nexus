import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { i18n, useTranslation } from '@/lib/i18n';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
  page?: 'home' | 'about' | 'products' | 'contact' | 'product';
}

export const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://lovable.dev/opengraph-image-p98pqg.png',
  structuredData,
  page = 'home'
}: SEOHeadProps) => {
  const { locale } = useTranslation('seo');
  const [seoData, setSeoData] = useState({
    title: title || 'CONSOLTECH',
    description: description || '',
    keywords: keywords || ''
  });

  useEffect(() => {
    const loadSEOData = async () => {
      const seoTitle = title || await i18n.translate(`${page}.title`, 'seo');
      const seoDescription = description || await i18n.translate(`${page}.description`, 'seo');
      const seoKeywords = keywords || await i18n.translate(`${page}.keywords`, 'seo');
      
      setSeoData({
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords
      });
    };

    loadSEOData();
  }, [locale, title, description, keywords, page]);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const canonicalUrl = canonical || currentUrl;
  
  // Generate hreflang URLs
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const basePath = typeof window !== 'undefined' ? window.location.pathname.replace(/^\/he/, '') : '';
  const enUrl = `${baseUrl}${basePath}`;
  const heUrl = `${baseUrl}/he${basePath === '/' ? '' : basePath}`;

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* OpenGraph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={locale === 'he' ? 'he_IL' : 'en_US'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Hreflang */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="he" href={heUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      
      {/* Language and direction */}
      <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};