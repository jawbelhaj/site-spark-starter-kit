
import React from 'react';
import { WebsiteConfig } from './WebsiteBuilder';
import { Tabs } from '@/components/ui/tabs';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { SidebarTabs } from './sidebar/SidebarTabs';
import { SidebarContent } from './sidebar/SidebarContent';
import { createSidebarEventHandlers } from './sidebar/SidebarEventHandlers';

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
  const eventHandlers = createSidebarEventHandlers(config, onConfigChange, onContentChange);

  return (
    <div className="w-80 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-xl">
      <SidebarHeader
        config={config}
        onLoadProject={onLoadProject}
        onSaveProject={onSaveProject}
        lastSaved={lastSaved}
        historyControls={historyControls}
        collaborationStatus={collaborationStatus}
      />

      <Tabs value={activeTab} onValueChange={onActiveTabChange} className="flex-1 flex flex-col">
        <SidebarTabs activeTab={activeTab} />
        
        <SidebarContent
          config={config}
          onConfigChange={onConfigChange}
          onContentChange={onContentChange}
          onAISuggestion={eventHandlers.handleAISuggestion}
          onAIPromptResult={eventHandlers.handleAIPromptResult}
          onSEOOptimize={eventHandlers.handleSEOOptimize}
          onPWAToggle={eventHandlers.handlePWAToggle}
        />
      </Tabs>
    </div>
  );
};
