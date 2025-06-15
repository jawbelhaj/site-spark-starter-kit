
import React, { useState } from 'react';
import { TemplateSelector } from './TemplateSelector';
import { CustomizationPanel } from './CustomizationPanel';
import { LivePreview } from './LivePreview';
import { ExportPanel } from './ExportPanel';
import { Code, Layout, Settings, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface WebsiteConfig {
  template: 'blog' | 'portfolio' | 'store' | 'landing';
  title: string;
  description: string;
  theme: 'light' | 'dark';
  primaryColor: string;
  font: string;
  content: {
    hero: {
      title: string;
      subtitle: string;
      image: string;
    };
    about: string;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
  };
}

const defaultConfig: WebsiteConfig = {
  template: 'landing',
  title: 'My Awesome Website',
  description: 'A beautiful website built with our generator',
  theme: 'light',
  primaryColor: '#3b82f6',
  font: 'Inter',
  content: {
    hero: {
      title: 'Build Amazing Websites',
      subtitle: 'Create professional websites in minutes with our powerful builder',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
    },
    about: 'We help businesses create stunning digital experiences that convert visitors into customers.',
    features: [
      {
        title: 'Responsive Design',
        description: 'Looks perfect on all devices',
        icon: 'layout-grid'
      },
      {
        title: 'SEO Optimized',
        description: 'Built for search engines',
        icon: 'code'
      },
      {
        title: 'Fast Loading',
        description: 'Optimized for speed',
        icon: 'layout-dashboard'
      }
    ],
    contact: {
      email: 'hello@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345'
    }
  }
};

export const WebsiteBuilder = () => {
  const [config, setConfig] = useState<WebsiteConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState('templates');

  const updateConfig = (updates: Partial<WebsiteConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateContent = (contentUpdates: Partial<WebsiteConfig['content']>) => {
    setConfig(prev => ({
      ...prev,
      content: { ...prev.content, ...contentUpdates }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Website Builder
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Create beautiful websites in minutes
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 m-4">
              <TabsTrigger value="templates" className="flex items-center gap-1">
                <Layout className="w-4 h-4" />
                <span className="hidden sm:inline">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="customize" className="flex items-center gap-1">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Customize</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-1">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="templates" className="h-full mt-0">
                <TemplateSelector 
                  selectedTemplate={config.template}
                  onTemplateChange={(template) => updateConfig({ template })}
                />
              </TabsContent>

              <TabsContent value="customize" className="h-full mt-0">
                <CustomizationPanel 
                  config={config}
                  onConfigChange={updateConfig}
                />
              </TabsContent>

              <TabsContent value="content" className="h-full mt-0">
                <div className="p-4 space-y-4 h-full overflow-y-auto">
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Title</label>
                    <input
                      type="text"
                      value={config.title}
                      onChange={(e) => updateConfig({ title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={config.description}
                      onChange={(e) => updateConfig({ description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white h-20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Hero Title</label>
                    <input
                      type="text"
                      value={config.content.hero.title}
                      onChange={(e) => updateContent({ 
                        hero: { ...config.content.hero, title: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                    <textarea
                      value={config.content.hero.subtitle}
                      onChange={(e) => updateContent({ 
                        hero: { ...config.content.hero, subtitle: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white h-16 resize-none"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="export" className="h-full mt-0">
                <ExportPanel config={config} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">Preview:</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white capitalize">
                {config.template} Template
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateConfig({ theme: config.theme === 'light' ? 'dark' : 'light' })}
              >
                {config.theme === 'light' ? '🌙' : '☀️'}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <LivePreview config={config} />
          </div>
        </div>
      </div>
    </div>
  );
};
