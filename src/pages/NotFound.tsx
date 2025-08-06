import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import { getMedicalOrganizationSchema } from '@/utils/schema';

const NotFound = () => {
  // Generate SEO data for the 404 page
  const seoData = {
    title: "Page Not Found | Maiya Hospital Bangalore",
    description: "The page you are looking for could not be found. Please check the URL or return to the homepage of Maiya Hospital Bangalore.",
    keywords: "page not found, 404 error, maiya hospital bangalore, hospital website",
    canonical: "https://maiyahospital.in/404",
    ogTitle: "Page Not Found | Maiya Hospital Bangalore",
    ogDescription: "The page you are looking for could not be found. Please check the URL or return to the homepage.",
    ogImage: "https://maiyahospital.in/404-og.jpg",
    twitterTitle: "Page Not Found | Maiya Hospital Bangalore",
    twitterDescription: "The page you are looking for could not be found. Please check the URL or return to the homepage.",
    twitterImage: "https://maiyahospital.in/404-twitter.jpg",
    structuredData: getMedicalOrganizationSchema()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] flex items-center justify-center">
      <SEOHead {...seoData} />
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you are looking for could not be found. Please check the URL or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Go to Homepage
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
