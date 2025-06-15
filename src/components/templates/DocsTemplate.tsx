
import React, { useState } from 'react';
import { WebsiteConfig } from '../WebsiteBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocsTemplateProps {
  config: WebsiteConfig;
}

const docsSections = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', content: 'Welcome to our documentation. This guide will help you get started quickly.' },
      { title: 'Installation', content: 'Follow these steps to install and set up the project on your system.' },
      { title: 'Quick Start', content: 'Get up and running in minutes with our quick start guide.' }
    ]
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Authentication', content: 'Learn how to authenticate with our API using various methods.' },
      { title: 'Endpoints', content: 'Complete reference of all available API endpoints and their usage.' },
      { title: 'Rate Limiting', content: 'Understanding rate limits and how to handle them in your applications.' }
    ]
  },
  {
    title: 'Examples',
    items: [
      { title: 'Basic Usage', content: 'Simple examples to get you started with the most common use cases.' },
      { title: 'Advanced Examples', content: 'Complex scenarios and advanced usage patterns for power users.' },
      { title: 'Integrations', content: 'How to integrate with popular third-party services and tools.' }
    ]
  }
];

export const DocsTemplate: React.FC<DocsTemplateProps> = ({ config }) => {
  const [selectedSection, setSelectedSection] = useState('Getting Started');
  const [selectedItem, setSelectedItem] = useState('Introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const [version, setVersion] = useState('v2.0');

  const currentSection = docsSections.find(section => section.title === selectedSection);
  const currentItem = currentSection?.items.find(item => item.title === selectedItem);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="font-bold text-xl flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📖</span>
                </div>
                Docs
              </div>
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v2.0">v2.0</SelectItem>
                  <SelectItem value="v1.9">v1.9</SelectItem>
                  <SelectItem value="v1.8">v1.8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Button size="sm" style={{ backgroundColor: config.primaryColor }}>
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {docsSections.map((section) => (
                  <div key={section.title}>
                    <button
                      onClick={() => setSelectedSection(section.title)}
                      className={`w-full text-left font-semibold p-2 rounded transition-colors ${
                        selectedSection === section.title
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {section.title}
                    </button>
                    {selectedSection === section.title && (
                      <div className="ml-4 mt-2 space-y-1">
                        {section.items.map((item) => (
                          <button
                            key={item.title}
                            onClick={() => setSelectedItem(item.title)}
                            className={`block w-full text-left text-sm p-2 rounded transition-colors ${
                              selectedItem === item.title
                                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span>Docs</span>
                <span>/</span>
                <span>{selectedSection}</span>
                <span>/</span>
                <span className="text-slate-900 dark:text-white">{selectedItem}</span>
              </div>

              {/* Content */}
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  {selectedItem}
                </h1>
                
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                    {currentItem?.content}
                  </p>

                  {selectedItem === 'Introduction' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold">What is this project?</h2>
                      <p>This is a comprehensive documentation site built with modern web technologies. It features a clean, searchable interface that makes finding information quick and easy.</p>
                      
                      <h2 className="text-2xl font-semibold">Key Features</h2>
                      <ul className="list-disc list-inside space-y-2">
                        <li>📖 Comprehensive documentation with clear navigation</li>
                        <li>🔍 Full-text search across all documentation</li>
                        <li>📱 Responsive design that works on all devices</li>
                        <li>🎨 Dark and light theme support</li>
                        <li>📊 Version control and change tracking</li>
                      </ul>

                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-600 dark:text-blue-400">💡</span>
                          <span className="font-semibold text-blue-800 dark:text-blue-200">Tip</span>
                        </div>
                        <p className="text-blue-700 dark:text-blue-300">
                          Use the search bar in the header to quickly find specific topics or use the table of contents to browse by category.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedItem === 'Installation' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold">Prerequisites</h2>
                      <p>Before installing, make sure you have the following:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Node.js 18 or higher</li>
                        <li>npm or yarn package manager</li>
                        <li>Git for version control</li>
                      </ul>

                      <h2 className="text-2xl font-semibold">Step-by-step Installation</h2>
                      <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 text-green-400 font-mono text-sm">
                        <div># Clone the repository</div>
                        <div>git clone https://github.com/yourproject/docs.git</div>
                        <div className="mt-2"># Install dependencies</div>
                        <div>npm install</div>
                        <div className="mt-2"># Start development server</div>
                        <div>npm run dev</div>
                      </div>
                    </div>
                  )}

                  {selectedItem === 'Authentication' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold">API Key Authentication</h2>
                      <p>All API requests require authentication using an API key. Include your API key in the request headers:</p>
                      
                      <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 text-green-400 font-mono text-sm">
                        <div>curl -H "Authorization: Bearer YOUR_API_KEY" \</div>
                        <div className="ml-4">https://api.example.com/v1/endpoint</div>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                          <span className="font-semibold text-yellow-800 dark:text-yellow-200">Warning</span>
                        </div>
                        <p className="text-yellow-700 dark:text-yellow-300">
                          Keep your API key secure and never expose it in client-side code.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <Button variant="outline">
                    ← Previous
                  </Button>
                  <Button style={{ backgroundColor: config.primaryColor }}>
                    Next →
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">On This Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <a href="#" className="block text-blue-600 dark:text-blue-400 hover:underline">Overview</a>
                  <a href="#" className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Getting Started</a>
                  <a href="#" className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Examples</a>
                  <a href="#" className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Best Practices</a>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Helpful Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📚 Tutorials
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💬 Community
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🐛 Report Issue
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📝 Edit Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
