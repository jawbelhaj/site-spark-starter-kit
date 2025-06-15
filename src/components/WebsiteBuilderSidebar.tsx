
import React from 'react';
import { TemplateSelector } from './TemplateSelector';
import { CustomizationPanel } from './CustomizationPanel';
import { ExportPanel } from './ExportPanel';
import { ProjectManager } from './ProjectManager';
import { ContentEditor } from './ContentEditor';
import { ComponentLibrary } from './ComponentLibrary';
import { ColorPaletteGenerator } from './ColorPaletteGenerator';
import { AIContentSuggestions } from './AIContentSuggestions';
import { AIPromptTemplates } from './AIPromptTemplates';
import { LiveSEOAnalyzer } from './LiveSEOAnalyzer';
import { SocialMediaIntegration } from './SocialMediaIntegration';
import { SEOOptimizer } from './SEOOptimizer';
import { PWAServiceWorker } from './PWAServiceWorker';
import { AccessibilityChecker } from './AccessibilityChecker';
import { WebsiteConfig } from './WebsiteBuilder';
import { Layout, Palette, FileText, Layers, Settings, Download, Sparkles, Search, Share, Eye, Smartphone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WebsiteBuilderSidebarProps {
  config: WebsiteConfig;
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
  onConfigChange: (updates: Partial<WebsiteConfig>) => void;
  onContentChange: (contentUpdates: Partial<WebsiteConfig['content']>) => void;
  onLoadProject: (projectConfig: WebsiteConfig) => void;
  onSaveProject: () => void;
  lastSaved: Date | null;
  historyControls: React.ReactNode;
  collaborationStatus?: React.ReactNode;
}

export const WebsiteBuilderSidebar: React.FC<WebsiteBuilderSidebarProps> = ({
  config,
  activeTab,
  onActiveTabChange,
  onConfigChange,
  onContentChange,
  onLoadProject,
  onSaveProject,
  lastSaved,
  historyControls,
  collaborationStatus
}) => {
  const handleAISuggestion = (suggestion: any) => {
    switch (suggestion.type) {
      case 'title':
        onConfigChange({ title: suggestion.text });
        break;
      case 'description':
        onConfigChange({ description: suggestion.text });
        break;
      case 'content':
        // Handle content suggestions
        break;
      default:
        break;
    }
  };

  const handleAIPromptResult = (result: any) => {
    // Apply AI-generated results to the website config
    switch (result.outputType) {
      case 'layout':
        // Apply layout changes
        break;
      case 'content':
        onContentChange({
          hero: {
            ...config.content.hero,
            title: result.result.headline,
            subtitle: result.result.subheadline
          }
        });
        break;
      case 'meta':
        onConfigChange({
          title: result.result.title,
          description: result.result.description
        });
        break;
      case 'styles':
        // Apply style changes
        break;
      default:
        break;
    }
  };

  const handleSocialUpdate = (socials: Record<string, string>) => {
    onConfigChange({ socials });
  };

  const handleSEOOptimize = (optimizations: any) => {
    // Apply SEO optimizations
    console.log('Applying SEO optimizations:', optimizations);
  };

  const handlePWAToggle = (enabled: boolean) => {
    // Toggle PWA features
    console.log('PWA features:', enabled ? 'enabled' : 'disabled');
  };

  return (
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
        
        <div className="flex items-center justify-between mb-3">
          <ProjectManager 
            currentConfig={config}
            onLoadProject={onLoadProject}
            onSaveProject={onSaveProject}
          />
          
          {historyControls}
        </div>

        {collaborationStatus && (
          <div className="mb-3">
            {collaborationStatus}
          </div>
        )}

        {lastSaved && (
          <p className="text-xs text-slate-500">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={onActiveTabChange} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-9 m-4 bg-slate-100 dark:bg-slate-700">
          <TabsTrigger value="templates" className="flex flex-col items-center gap-1 p-2">
            <Layout className="w-3 h-3" />
            <span className="text-xs">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="customize" className="flex flex-col items-center gap-1 p-2">
            <Palette className="w-3 h-3" />
            <span className="text-xs">Style</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex flex-col items-center gap-1 p-2">
            <FileText className="w-3 h-3" />
            <span className="text-xs">Content</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex flex-col items-center gap-1 p-2">
            <Sparkles className="w-3 h-3" />
            <span className="text-xs">AI</span>
          </TabsTrigger>
          <TabsTrigger value="components" className="flex flex-col items-center gap-1 p-2">
            <Layers className="w-3 h-3" />
            <span className="text-xs">Components</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex flex-col items-center gap-1 p-2">
            <Search className="w-3 h-3" />
            <span className="text-xs">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="flex flex-col items-center gap-1 p-2">
            <Eye className="w-3 h-3" />
            <span className="text-xs">A11y</span>
          </TabsTrigger>
          <TabsTrigger value="pwa" className="flex flex-col items-center gap-1 p-2">
            <Smartphone className="w-3 h-3" />
            <span className="text-xs">PWA</span>
          </TabsTrigger>
          <TabsTrigger value="export" className="flex flex-col items-center gap-1 p-2">
            <Download className="w-3 h-3" />
            <span className="text-xs">Export</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="templates" className="h-full mt-0">
            <TemplateSelector 
              selectedTemplate={config.template}
              onTemplateChange={(template) => onConfigChange({ template })}
            />
          </TabsContent>

          <TabsContent value="customize" className="h-full mt-0">
            <div className="space-y-4 p-4 h-full overflow-y-auto">
              <CustomizationPanel 
                config={config}
                onConfigChange={onConfigChange}
              />
              <div className="border-t pt-4">
                <ColorPaletteGenerator
                  currentColor={config.primaryColor}
                  onColorChange={(color) => onConfigChange({ primaryColor: color })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="h-full mt-0">
            <ContentEditor 
              config={config}
              onConfigChange={onConfigChange}
              onContentChange={onContentChange}
            />
          </TabsContent>

          <TabsContent value="ai" className="h-full mt-0">
            <div className="p-4 space-y-6 h-full overflow-y-auto">
              <AIPromptTemplates
                config={config}
                onApplyResult={handleAIPromptResult}
              />
              <div className="border-t pt-4">
                <AIContentSuggestions
                  currentContent={config.content}
                  onApplySuggestion={handleAISuggestion}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="components" className="h-full mt-0">
            <ComponentLibrary />
          </TabsContent>

          <TabsContent value="seo" className="h-full mt-0">
            <div className="p-4 space-y-4 h-full overflow-y-auto">
              <SEOOptimizer 
                config={config}
                onOptimize={handleSEOOptimize}
              />
            </div>
          </TabsContent>

          <TabsContent value="accessibility" className="h-full mt-0">
            <div className="p-4 space-y-4 h-full overflow-y-auto">
              <AccessibilityChecker config={config} />
            </div>
          </TabsContent>

          <TabsContent value="pwa" className="h-full mt-0">
            <div className="p-4 space-y-4 h-full overflow-y-auto">
              <PWAServiceWorker 
                isEnabled={config.template === 'pwa'}
                onToggle={handlePWAToggle}
              />
            </div>
          </TabsContent>

          <TabsContent value="export" className="h-full mt-0">
            <ExportPanel config={config} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
