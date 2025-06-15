
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WebsiteConfig } from './WebsiteBuilder';

interface TemplateSelectorProps {
  selectedTemplate: WebsiteConfig['template'];
  onTemplateChange: (template: WebsiteConfig['template']) => void;
}

const templates = [
  {
    id: 'landing' as const,
    name: 'Landing Page',
    description: 'Perfect for product launches and marketing campaigns',
    image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511',
    features: ['Hero Section', 'Features Grid', 'Testimonials', 'Contact Form'],
    category: 'Marketing'
  },
  {
    id: 'portfolio' as const,
    name: 'Portfolio',
    description: 'Showcase your work and skills professionally',
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544',
    features: ['Project Gallery', 'About Section', 'Skills Display', 'Contact Info'],
    category: 'Personal'
  },
  {
    id: 'blog' as const,
    name: 'Blog',
    description: 'Share your thoughts and build an audience',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    features: ['Article List', 'Categories', 'Search', 'Author Bio'],
    category: 'Content'
  },
  {
    id: 'store' as const,
    name: 'Online Store',
    description: 'Sell products with a beautiful storefront',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    features: ['Product Catalog', 'Shopping Cart', 'Checkout', 'Inventory'],
    category: 'E-commerce'
  },
  {
    id: 'pwa' as const,
    name: 'Offline PWA',
    description: 'Installable app that works offline with service workers',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    features: ['Offline Support', 'Installable', 'Push Notifications', 'Cache Management'],
    category: 'Application'
  },
  {
    id: 'docs' as const,
    name: 'Docs Site',
    description: 'Documentation site with search, TOC, and versioning',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    features: ['Table of Contents', 'Search', 'Versioning', 'Navigation'],
    category: 'Documentation'
  }
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange
}) => {
  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Choose Your Template
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Select a template to get started. You can customize everything later.
        </p>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
              selectedTemplate === template.id
                ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{template.name}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {template.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
