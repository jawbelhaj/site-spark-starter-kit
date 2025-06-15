
import React, { useState, useEffect } from 'react';
import { ResponsivePreview } from './ResponsivePreview';
import { WebsiteBuilderSidebar } from './WebsiteBuilderSidebar';
import { WebsiteBuilderHeader } from './WebsiteBuilderHeader';
import { HistoryControls } from './HistoryControls';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { CollaborationStatus } from './CollaborationStatus';
import { useHistoryState } from '../hooks/useHistoryState';
import { useToast } from '@/hooks/use-toast';

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
  socials?: Record<string, string>;
  analytics?: {
    googleAnalytics?: string;
    facebookPixel?: string;
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
  },
  socials: {},
  analytics: {}
};

export const WebsiteBuilder = () => {
  const { 
    state: config, 
    setState: setConfig, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useHistoryState<WebsiteConfig>(defaultConfig);
  
  const [activeTab, setActiveTab] = useState('templates');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const { toast } = useToast();

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      const projectData = {
        config,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('website-builder-autosave', JSON.stringify(projectData));
      setLastSaved(new Date());
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [config]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
    toast({
      title: "Project Loaded!",
      description: "Your project has been loaded successfully.",
    });
  };

  const saveProject = () => {
    setLastSaved(new Date());
    toast({
      title: "Project Saved!",
      description: "Your changes have been saved.",
    });
  };

  const exportProject = () => {
    toast({
      title: "Export Started!",
      description: "Your website is being prepared for download.",
    });
  };

  const previewProject = () => {
    toast({
      title: "Preview Mode",
      description: "Viewing your website in preview mode.",
    });
  };

  const handleUndo = () => {
    undo();
    toast({
      title: "Undone",
      description: "Last action has been undone.",
    });
  };

  const handleRedo = () => {
    redo();
    toast({
      title: "Redone",
      description: "Action has been redone.",
    });
  };

  const toggleTheme = () => {
    updateConfig({ theme: config.theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex h-screen">
        <WebsiteBuilderSidebar
          config={config}
          activeTab={activeTab}
          onActiveTabChange={setActiveTab}
          onConfigChange={updateConfig}
          onContentChange={updateContent}
          onLoadProject={loadProject}
          onSaveProject={saveProject}
          lastSaved={lastSaved}
          historyControls={
            <div className="flex items-center gap-2">
              <HistoryControls
                canUndo={canUndo}
                canRedo={canRedo}
                onUndo={handleUndo}
                onRedo={handleRedo}
              />
              <KeyboardShortcuts
                onUndo={handleUndo}
                onRedo={handleRedo}
                onSave={saveProject}
                onExport={exportProject}
                onPreview={previewProject}
              />
            </div>
          }
          collaborationStatus={
            <CollaborationStatus isOnline={isOnline} />
          }
        />

        <div className="flex-1 flex flex-col">
          <WebsiteBuilderHeader
            config={config}
            onThemeToggle={toggleTheme}
          />

          <div className="flex-1 overflow-hidden bg-slate-100 dark:bg-slate-900">
            <ResponsivePreview config={config} />
          </div>
        </div>
      </div>
    </div>
  );
};
