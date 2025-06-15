
import React from 'react';
import { Layout, Palette, FileText, Layers, Settings, Download, Sparkles, Search, Share, Eye, Smartphone } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SidebarTabsProps {
  activeTab: string;
}

export const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab }) => {
  return (
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
  );
};
