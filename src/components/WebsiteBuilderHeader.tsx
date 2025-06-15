
import React from 'react';
import { Button } from '@/components/ui/button';
import { WebsiteConfig } from './WebsiteBuilder';

interface WebsiteBuilderHeaderProps {
  config: WebsiteConfig;
  onThemeToggle: () => void;
}

export const WebsiteBuilderHeader: React.FC<WebsiteBuilderHeaderProps> = ({
  config,
  onThemeToggle
}) => {
  return (
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
          onClick={onThemeToggle}
          className="transition-all hover:scale-105"
        >
          {config.theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </div>
    </div>
  );
};
