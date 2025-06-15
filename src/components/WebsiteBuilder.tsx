
import React, { useState } from 'react';
import { TemplateSelector } from './TemplateSelector';
import { CustomizationPanel } from './CustomizationPanel';
import { LivePreview } from './LivePreview';
import { ExportPanel } from './ExportPanel';
import { ProjectManager } from './ProjectManager';
import { ContentEditor } from './ContentEditor';
import { Code, Layout, Settings, Download, FileText, Palette } from 'lucide-react';
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

  const loadProject = (projectConfig: WebsiteConfig) => {
    setConfig(projectConfig);
  };

  const saveProject = () => {
    // Project saved in ProjectManager component
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex h-screen">
        {/* Enhanced Sidebar */}
        <div className="w-80 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-xl">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Website Builder
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Create beautiful websites in minutes
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <ProjectManager 
              currentConfig={config}
              onLoadProject={loadProject}
              onSaveProject={saveProject}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-5 m-4 bg-slate-100 dark:bg-slate-700">
              <TabsTrigger value="templates" className="flex flex-col items-center gap-1 p-3">
                <Layout className="w-4 h-4" />
                <span className="text-xs">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="customize" className="flex flex-col items-center gap-1 p-3">
                <Palette className="w-4 h-4" />
                <span className="text-xs">Style</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex flex-col items-center gap-1 p-3">
                <FileText className="w-4 h-4" />
                <span className="text-xs">Content</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex flex-col items-center gap-1 p-3">
                <Settings className="w-4 h-4" />
                <span className="text-xs">Advanced</span>
              </TabsTrigger>
              <TabsTrigger value="export" className="flex flex-col items-center gap-1 p-3">
                <Download className="w-4 h-4" />
                <span className="text-xs">Export</span>
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
                <ContentEditor 
                  config={config}
                  onConfigChange={updateConfig}
                  onContentChange={updateContent}
                />
              </TabsContent>

              <TabsContent value="advanced" className="h-full mt-0">
                <div className="p-4 space-y-4 h-full overflow-y-auto">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Advanced Settings
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Custom CSS</label>
                      <textarea
                        placeholder="/* Add your custom CSS here */"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white h-32 resize-none font-mono text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Meta Tags</label>
                      <textarea
                        placeholder="Additional meta tags for SEO"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white h-20 resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Analytics Code</label>
                      <textarea
                        placeholder="Google Analytics or other tracking code"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white h-20 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="export" className="h-full mt-0">
                <ExportPanel config={config} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Enhanced Main Preview Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span>Preview:</span>
                <span className="font-medium text-slate-900 dark:text-white capitalize">
                  {config.template} Template
                </span>
                <span className="text-slate-400">•</span>
                <span className="capitalize">{config.theme} mode</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Live Preview</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateConfig({ theme: config.theme === 'light' ? 'dark' : 'light' })}
                className="transition-all hover:scale-105"
              >
                {config.theme === 'light' ? '🌙' : '☀️'}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-slate-100 dark:bg-slate-900">
            <LivePreview config={config} />
          </div>
        </div>
      </div>
    </div>
  );
};
