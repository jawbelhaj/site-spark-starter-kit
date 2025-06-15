
import React from 'react';
import { WebsiteConfig } from './WebsiteBuilder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit3, Image } from 'lucide-react';

interface ContentEditorProps {
  config: WebsiteConfig;
  onConfigChange: (updates: Partial<WebsiteConfig>) => void;
  onContentChange: (contentUpdates: Partial<WebsiteConfig['content']>) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  config,
  onConfigChange,
  onContentChange
}) => {
  const addFeature = () => {
    const newFeature = {
      title: 'New Feature',
      description: 'Feature description',
      icon: 'star'
    };
    onContentChange({
      features: [...config.content.features, newFeature]
    });
  };

  const updateFeature = (index: number, updates: Partial<typeof config.content.features[0]>) => {
    const updatedFeatures = config.content.features.map((feature, i) => 
      i === index ? { ...feature, ...updates } : feature
    );
    onContentChange({ features: updatedFeatures });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = config.content.features.filter((_, i) => i !== index);
    onContentChange({ features: updatedFeatures });
  };

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Content Editor
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Customize your website's content and messaging
        </p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic Information</CardTitle>
          <CardDescription>
            Set your website's title and description
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site-title" className="text-sm font-medium">Site Title</Label>
            <Input
              id="site-title"
              value={config.title}
              onChange={(e) => onConfigChange({ title: e.target.value })}
              placeholder="My Awesome Website"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="site-description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="site-description"
              value={config.description}
              onChange={(e) => onConfigChange({ description: e.target.value })}
              placeholder="A brief description of your website"
              className="mt-1 h-20 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hero Section</CardTitle>
          <CardDescription>
            The main banner that visitors see first
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero-title" className="text-sm font-medium">Hero Title</Label>
            <Input
              id="hero-title"
              value={config.content.hero.title}
              onChange={(e) => onContentChange({ 
                hero: { ...config.content.hero, title: e.target.value }
              })}
              placeholder="Build Amazing Websites"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="hero-subtitle" className="text-sm font-medium">Hero Subtitle</Label>
            <Textarea
              id="hero-subtitle"
              value={config.content.hero.subtitle}
              onChange={(e) => onContentChange({ 
                hero: { ...config.content.hero, subtitle: e.target.value }
              })}
              placeholder="A compelling subtitle that describes your offering"
              className="mt-1 h-16 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="hero-image" className="text-sm font-medium">Hero Image URL</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="hero-image"
                value={config.content.hero.image}
                onChange={(e) => onContentChange({ 
                  hero: { ...config.content.hero, image: e.target.value }
                })}
                placeholder="https://images.unsplash.com/..."
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                <Image className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">About Section</CardTitle>
          <CardDescription>
            Tell visitors about your business or project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={config.content.about}
            onChange={(e) => onContentChange({ about: e.target.value })}
            placeholder="Tell your story and what makes you unique..."
            className="h-24 resize-none"
          />
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Features</CardTitle>
              <CardDescription>
                Highlight your key features and benefits
              </CardDescription>
            </div>
            <Button onClick={addFeature} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Feature
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {config.content.features.map((feature, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Feature {index + 1}</Badge>
                  <Button
                    onClick={() => removeFeature(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Feature Title</Label>
                  <Input
                    value={feature.title}
                    onChange={(e) => updateFeature(index, { title: e.target.value })}
                    placeholder="Feature name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(index, { description: e.target.value })}
                    placeholder="Describe this feature"
                    className="mt-1 h-16 resize-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Information</CardTitle>
          <CardDescription>
            How visitors can reach you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contact-email" className="text-sm font-medium">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={config.content.contact.email}
              onChange={(e) => onContentChange({ 
                contact: { ...config.content.contact, email: e.target.value }
              })}
              placeholder="hello@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contact-phone" className="text-sm font-medium">Phone</Label>
            <Input
              id="contact-phone"
              type="tel"
              value={config.content.contact.phone}
              onChange={(e) => onContentChange({ 
                contact: { ...config.content.contact, phone: e.target.value }
              })}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contact-address" className="text-sm font-medium">Address</Label>
            <Input
              id="contact-address"
              value={config.content.contact.address}
              onChange={(e) => onContentChange({ 
                contact: { ...config.content.contact, address: e.target.value }
              })}
              placeholder="123 Main St, City, State 12345"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
