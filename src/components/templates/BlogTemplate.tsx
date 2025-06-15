
import React from 'react';
import { WebsiteConfig } from '../WebsiteBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogTemplateProps {
  config: WebsiteConfig;
}

const blogPosts = [
  {
    title: 'Getting Started with React in 2024',
    excerpt: 'A comprehensive guide to building modern React applications with the latest features and best practices.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    author: 'John Doe',
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Web Development'
  },
  {
    title: 'The Future of Web Design: Trends to Watch',
    excerpt: 'Exploring upcoming design trends and how they will shape the digital landscape in the coming years.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb',
    author: 'Jane Smith',
    date: 'March 12, 2024',
    readTime: '8 min read',
    category: 'Design'
  },
  {
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Learn how to create robust and scalable backend services using Node.js and modern development practices.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    author: 'Mike Johnson',
    date: 'March 10, 2024',
    readTime: '12 min read',
    category: 'Backend'
  }
];

export const BlogTemplate: React.FC<BlogTemplateProps> = ({ config }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">DevBlog</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
              <a href="#articles" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Articles</a>
              <a href="#categories" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Categories</a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
            </div>
            <Button size="sm" variant="outline">
              Subscribe
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                Welcome to DevBlog
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Insights, tutorials, and thoughts on modern web development, design, and technology trends.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" style={{ backgroundColor: config.primaryColor }}>
                Read Latest Posts
              </Button>
              <Button variant="outline" size="lg">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Featured Article</h2>
            <p className="text-slate-600 dark:text-slate-300">Don't miss our latest featured content</p>
          </div>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge style={{ backgroundColor: config.primaryColor }}>
                    {blogPosts[0].category}
                  </Badge>
                  <span className="text-sm text-slate-500">{blogPosts[0].readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {blogPosts[0].title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {blogPosts[0].author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{blogPosts[0].author}</div>
                      <div className="text-sm text-slate-500">{blogPosts[0].date}</div>
                    </div>
                  </div>
                  <Button style={{ backgroundColor: config.primaryColor }}>
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Articles */}
      <section id="articles" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center">
              Recent Articles
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 text-center">
              Stay updated with our latest posts
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-slate-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">{post.author}</div>
                        <div className="text-xs text-slate-500">{post.date}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Find articles that interest you most
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Web Development', 'Design', 'Backend', 'Mobile'].map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">
                    {index === 0 && '💻'}
                    {index === 1 && '🎨'}
                    {index === 2 && '⚙️'}
                    {index === 3 && '📱'}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {category}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {Math.floor(Math.random() * 20) + 5} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Never Miss an Update
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter and get the latest articles delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500"
              />
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-bold text-xl mb-4">DevBlog</div>
          <p className="text-slate-400 mb-8">
            Sharing knowledge, one post at a time.
          </p>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500">
              © 2024 DevBlog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
