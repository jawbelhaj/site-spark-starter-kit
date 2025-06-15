
import React from 'react';
import { Layout } from 'lucide-react';
import { ProjectManager } from '../ProjectManager';
import { WebsiteConfig } from '../WebsiteBuilder';

interface SidebarHeaderProps {
  config: WebsiteConfig;
  onLoadProject: (projectConfig: WebsiteConfig) => void;
  onSaveProject: () => void;
  lastSaved: Date | null;
  historyControls: React.ReactNode;
  collaborationStatus?: React.ReactNode;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  config,
  onLoadProject,
  onSaveProject,
  lastSaved,
  historyControls,
  collaborationStatus
}) => {
  return (
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
  );
};
