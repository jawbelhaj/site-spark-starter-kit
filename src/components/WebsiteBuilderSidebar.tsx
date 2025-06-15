
import React from 'react';
import { TemplateSelector } from './TemplateSelector';
import { CustomizationPanel } from './CustomizationPanel';
import { ExportPanel } from './ExportPanel';
import { ProjectManager } from './ProjectManager';
import { ContentEditor } from './ContentEditor';
import { ComponentLibrary } from './ComponentLibrary';
import { ColorPaletteGenerator } from './ColorPaletteGenerator';
import { WebsiteConfig } from './WebsiteBuilder';
import { Layout, Palette, FileText, Layers, Settings, Download } from 'lucide-react';
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
  historyControls
}) => {
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
        
        <div className="flex items-center justify-between">
          <ProjectManager 
            currentConfig={config}
            onLoadProject={onLoadProject}
            onSaveProject={onSaveProject}
          />
          
          {historyControls}
        </div>

        {lastSaved && (
          <p className="text-xs text-slate-500 mt-2">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={onActiveTabChange} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-6 m-4 bg-slate-100 dark:bg-slate-700">
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
          <TabsTrigger value="components" className="flex flex-col items-center gap-1 p-2">
            <Layers className="w-3 h-3" />
            <span className="text-xs">Components</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex flex-col items-center gap-1 p-2">
            <Settings className="w-3 h-3" />
            <span className="text-xs">Advanced</span>
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

          <TabsContent value="components" className="h-full mt-0">
            <ComponentLibrary />
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
  );
};
