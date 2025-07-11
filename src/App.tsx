import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import './App.css'; 

// --- Configuration for Your Contentful Space ---
const contentfulClient = createClient({
  space: "9yvx4uo492ys", // Your Space ID
  accessToken: "lk4quy9SpiuVE4N3HAfb6Wd7g_hFBWIo1meYEh5HR4M", // Your Content Delivery API Token
});


function App() {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPageData = async () => {
      try {
        // === THIS IS THE LINE WE JUST FIXED ===
        const entries = await contentfulClient.getEntries({ content_type: 'pageBlogPost', limit: 1 });

        if (entries.items.length > 0) {
          setPageData(entries.items[0]); // Save the first entry we find
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data from Contentful:", err);
        setError("Failed to load content from the new CMS.");
        setIsLoading(false);
      }
    };

    getPageData();
  }, []); 

  if (isLoading) {
    return <div className="loading-message">Loading Content from Contentful CMS...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // If data is loaded, display the title!
  // Note: Contentful data is inside the 'fields' object
  return (
    <div className="App">
      <h1>{pageData.fields.title}</h1>
      
      {/* We will add the body content in the next step! */}
    </div>
  );
}

export default App;