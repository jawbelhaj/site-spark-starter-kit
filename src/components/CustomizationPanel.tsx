
import React from 'react';
import { WebsiteConfig } from './WebsiteBuilder';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface CustomizationPanelProps {
  config: WebsiteConfig;
  onConfigChange: (updates: Partial<WebsiteConfig>) => void;
}

const colorOptions = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Teal', value: '#14b8a6' }
];

const fontOptions = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Playfair Display', value: 'Playfair Display' }
];

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  config,
  onConfigChange
}) => {
  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Customize Your Site
        </h2>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Theme</Label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onConfigChange({ theme: 'light' })}
            className={`p-3 rounded-lg border-2 transition-all ${
              config.theme === 'light'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="w-full h-8 bg-white rounded border mb-2"></div>
            <span className="text-xs">Light</span>
          </button>
          <button
            onClick={() => onConfigChange({ theme: 'dark' })}
            className={`p-3 rounded-lg border-2 transition-all ${
              config.theme === 'dark'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="w-full h-8 bg-slate-800 rounded border mb-2"></div>
            <span className="text-xs">Dark</span>
          </button>
        </div>
      </div>

      {/* Primary Color */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Primary Color</Label>
        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              onClick={() => onConfigChange({ primaryColor: color.value })}
              className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                config.primaryColor === color.value
                  ? 'border-slate-400 shadow-lg scale-110'
                  : 'border-slate-200 dark:border-slate-600'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Font Family</Label>
        <Select value={config.font} onValueChange={(font) => onConfigChange({ font })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.value }}>{font.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Layout Options */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Layout Style</Label>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Border Radius</span>
            <span className="text-xs text-slate-500">Modern</span>
          </div>
          <Slider
            value={[8]}
            max={20}
            min={0}
            step={2}
            className="w-full"
          />
        </div>
      </div>

      {/* Animation Settings */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Animations</Label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Fade In Effects</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Hover Animations</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Parallax Scrolling</span>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
