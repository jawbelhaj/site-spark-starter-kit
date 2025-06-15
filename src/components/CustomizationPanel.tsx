
import React from 'react';
import { WebsiteConfig } from './WebsiteBuilder';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface CustomizationPanelProps {
  config: WebsiteConfig;
  onConfigChange: (updates: Partial<WebsiteConfig>) => void;
}

const colorOptions = [
  { name: 'Blue', value: '#3b82f6', gradient: 'from-blue-400 to-blue-600' },
  { name: 'Purple', value: '#8b5cf6', gradient: 'from-purple-400 to-purple-600' },
  { name: 'Green', value: '#10b981', gradient: 'from-green-400 to-green-600' },
  { name: 'Red', value: '#ef4444', gradient: 'from-red-400 to-red-600' },
  { name: 'Orange', value: '#f97316', gradient: 'from-orange-400 to-orange-600' },
  { name: 'Pink', value: '#ec4899', gradient: 'from-pink-400 to-pink-600' },
  { name: 'Indigo', value: '#6366f1', gradient: 'from-indigo-400 to-indigo-600' },
  { name: 'Teal', value: '#14b8a6', gradient: 'from-teal-400 to-teal-600' }
];

const fontOptions = [
  { name: 'Inter', value: 'Inter', description: 'Modern and clean' },
  { name: 'Roboto', value: 'Roboto', description: 'Google\'s signature font' },
  { name: 'Open Sans', value: 'Open Sans', description: 'Friendly and readable' },
  { name: 'Poppins', value: 'Poppins', description: 'Geometric and modern' },
  { name: 'Montserrat', value: 'Montserrat', description: 'Urban and stylish' },
  { name: 'Playfair Display', value: 'Playfair Display', description: 'Elegant serif' }
];

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  config,
  onConfigChange
}) => {
  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Design Customization
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Personalize your website's appearance
        </p>
      </div>

      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Theme Mode</CardTitle>
          <CardDescription>
            Choose between light and dark appearance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onConfigChange({ theme: 'light' })}
              className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                config.theme === 'light'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-slate-200 dark:border-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="w-full h-12 bg-white rounded-lg border mb-3 shadow-sm"></div>
              <div className="text-sm font-medium">Light Mode</div>
              <div className="text-xs text-slate-500 mt-1">Clean and bright</div>
            </button>
            <button
              onClick={() => onConfigChange({ theme: 'dark' })}
              className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                config.theme === 'dark'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-slate-200 dark:border-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="w-full h-12 bg-slate-800 rounded-lg border mb-3"></div>
              <div className="text-sm font-medium">Dark Mode</div>
              <div className="text-xs text-slate-500 mt-1">Modern and sleek</div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Primary Color */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand Color</CardTitle>
          <CardDescription>
            Choose your primary brand color
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => onConfigChange({ primaryColor: color.value })}
                className={`aspect-square rounded-xl transition-all hover:scale-110 ${
                  config.primaryColor === color.value
                    ? 'ring-2 ring-offset-2 ring-slate-400 shadow-lg scale-110'
                    : 'hover:shadow-md'
                }`}
                title={color.name}
              >
                <div className={`w-full h-full rounded-xl bg-gradient-to-br ${color.gradient}`} />
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Current color: <span className="font-mono">{config.primaryColor}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Font Family */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Typography</CardTitle>
          <CardDescription>
            Select the perfect font for your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={config.font} onValueChange={(font) => onConfigChange({ font })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <div className="flex flex-col items-start">
                    <span style={{ fontFamily: font.value }} className="font-medium">
                      {font.name}
                    </span>
                    <span className="text-xs text-slate-500">{font.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div 
              style={{ fontFamily: config.font }}
              className="text-sm"
            >
              Sample text in {config.font}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout & Spacing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Layout & Spacing</CardTitle>
          <CardDescription>
            Fine-tune the layout and spacing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Border Radius</Label>
              <Badge variant="outline">Modern</Badge>
            </div>
            <Slider
              value={[8]}
              max={20}
              min={0}
              step={2}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Sharp</span>
              <span>Rounded</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Content Width</Label>
              <Badge variant="outline">Responsive</Badge>
            </div>
            <Slider
              value={[80]}
              max={100}
              min={60}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Narrow</span>
              <span>Full Width</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animation & Effects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Animations & Effects</CardTitle>
          <CardDescription>
            Add life to your website with animations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Fade In Effects</div>
              <div className="text-xs text-slate-500">Smooth entrance animations</div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Hover Animations</div>
              <div className="text-xs text-slate-500">Interactive hover effects</div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Parallax Scrolling</div>
              <div className="text-xs text-slate-500">Advanced scroll effects</div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Page Transitions</div>
              <div className="text-xs text-slate-500">Smooth page navigation</div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Performance & SEO */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance & SEO</CardTitle>
          <CardDescription>
            Optimize for speed and search engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Image Optimization</div>
              <div className="text-xs text-slate-500">Automatic image compression</div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Lazy Loading</div>
              <div className="text-xs text-slate-500">Load content as needed</div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">SEO Meta Tags</div>
              <div className="text-xs text-slate-500">Auto-generate meta tags</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
