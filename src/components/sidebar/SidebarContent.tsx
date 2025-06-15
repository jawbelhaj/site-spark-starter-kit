
import React from 'react';
import { TemplateSelector } from '../TemplateSelector';
import { CustomizationPanel } from '../CustomizationPanel';
import { ExportPanel } from '../ExportPanel';
import { ContentEditor } from '../ContentEditor';
import { ComponentLibrary } from '../ComponentLibrary';
import { ColorPaletteGenerator } from '../ColorPaletteGenerator';
import { AIContentSuggestions } from '../AIContentSuggestions';
import { AIPromptTemplates } from '../AIPromptTemplates';
import { SEOOptimizer } from '../SEOOptimizer';
import { PWAServiceWorker } from '../PWAServiceWorker';
import { AccessibilityChecker } from '../AccessibilityChecker';
import { WebsiteConfig } from '../WebsiteBuilder';
import { TabsContent } from '@/components/ui/tabs';

interface SidebarContentProps {
  config: WebsiteConfig;
  onConfigChange: (updates: Partial<WebsiteConfig>) => void;
  onContentChange: (contentUpdates: Partial<WebsiteConfig['content']>) => void;
  onAISuggestion: (suggestion: any) => void;
  onAIPromptResult: (result: any) => void;
  onSEOOptimize: (optimizations: any) => void;
  onPWAToggle: (enabled: boolean) => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  config,
  onConfigChange,
  onContentChange,
  onAISuggestion,
  onAIPromptResult,
  onSEOOptimize,
  onPWAToggle
}) => {
  return (
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
            onApplyResult={onAIPromptResult}
          />
          <div className="border-t pt-4">
            <AIContentSuggestions
              currentContent={config.content}
              onApplySuggestion={onAISuggestion}
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
            onOptimize={onSEOOptimize}
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
            onToggle={onPWAToggle}
          />
        </div>
      </TabsContent>

      <TabsContent value="export" className="h-full mt-0">
        <ExportPanel config={config} />
      </TabsContent>
    </div>
  );
};
