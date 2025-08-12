import React from "react";
import { useParams } from "react-router-dom";
import { blogApi, Blog } from '@/services/api';
import { SEOHead } from '@/components/seo/SEOHead';
import Footer from "@/components/Footer";
import { getMedicalOrganizationSchema, getArticleSchema } from '@/utils/schema';
import { useState, useEffect } from 'react';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getById(id!);
        setBlog(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Blog Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
            <button 
              onClick={() => window.history.back()} 
              className="bg-green-700 hover:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Generate SEO data for the blog detail page
  const seoData = {
    title: `${blog.title} | Maiya Hospital Health Blog, Jayanagar`,
    description: blog.excerpt || blog.content.substring(0, 160) + '...',
    keywords: `health blog bangalore, medical news, healthcare tips, ${blog.title.toLowerCase()}, maiya hospital blog, health information jayanagar`,
    canonical: `https://maiyahospital.in/blog/${id}`,
    ogTitle: `${blog.title} | Maiya Hospital Health Blog, Jayanagar`,
    ogDescription: blog.excerpt || blog.content.substring(0, 160) + '...',
    ogImage: blog.image || 'https://maiyahospital.in/blog-default-og.jpg',
    twitterTitle: `${blog.title} | Maiya Hospital Health Blog, Jayanagar`,
    twitterDescription: blog.excerpt || blog.content.substring(0, 160) + '...',
    twitterImage: blog.image || 'https://maiyahospital.in/blog-default-twitter.jpg',
    structuredData: [getMedicalOrganizationSchema(), getArticleSchema({
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 160),
      image: blog.image || 'https://maiyahospital.in/blog-default-og.jpg',
      publishedDate: blog.createdAt,
      modifiedDate: blog.updatedAt || blog.createdAt,
      url: `https://maiyahospital.in/blog/${id}`
    })],
    articlePublishedTime: blog.createdAt,
    articleModifiedTime: blog.updatedAt || blog.createdAt,
    articleAuthor: "Maiya Hospital",
    articleSection: "Health & Wellness",
    articleTag: ["health", "medical", "wellness", "healthcare"]
  };

  // Generate Article Schema for Rich Results
  const articleSchema = getArticleSchema({
    title: blog.title,
    description: blog.excerpt || blog.content.substring(0, 160),
    image: blog.image || 'https://maiyahospital.in/blog-default-og.jpg',
    publishedDate: blog.createdAt,
    modifiedDate: blog.updatedAt || blog.createdAt,
    url: `https://maiyahospital.in/blog/${id}`
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,100%,98%)] via-[hsl(230,100%,97%)] to-[hsl(250,100%,98%)] py-16">
      <SEOHead {...seoData} />
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          {/* Blog Header */}
          <header className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
              <span className="mx-2">•</span>
              <span>Health Tips</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Blog Image */}
          {blog.image && (
            <div className="mb-8">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          {/* Blog Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Share this article:</span>
                <button className="text-blue-600 hover:text-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 3a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zM4 5a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V5z"/>
                  </svg>
                </button>
              </div>
              <button 
                onClick={() => window.history.back()} 
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                ← Back to Blogs
              </button>
            </div>
          </footer>
        </article>
      </div>
      
      <Footer />
    </div>
  );
} 