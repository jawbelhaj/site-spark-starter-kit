
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Copy, Check, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ColorPaletteGeneratorProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

interface ColorPalette {
  name: string;
  colors: string[];
  description: string;
}

const predefinedPalettes: ColorPalette[] = [
  {
    name: 'Ocean Blue',
    colors: ['#3b82f6', '#1e40af', '#1d4ed8', '#2563eb', '#60a5fa'],
    description: 'Professional and trustworthy'
  },
  {
    name: 'Forest Green',
    colors: ['#10b981', '#059669', '#047857', '#065f46', '#34d399'],
    description: 'Natural and sustainable'
  },
  {
    name: 'Sunset Orange',
    colors: ['#f97316', '#ea580c', '#dc2626', '#b91c1c', '#fb923c'],
    description: 'Energetic and creative'
  },
  {
    name: 'Royal Purple',
    colors: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#a78bfa'],
    description: 'Luxury and innovation'
  },
  {
    name: 'Coral Pink',
    colors: ['#ec4899', '#db2777', '#be185d', '#9d174d', '#f472b6'],
    description: 'Friendly and approachable'
  },
  {
    name: 'Midnight Dark',
    colors: ['#374151', '#1f2937', '#111827', '#030712', '#6b7280'],
    description: 'Elegant and sophisticated'
  }
];

export const ColorPaletteGenerator: React.FC<ColorPaletteGeneratorProps> = ({
  currentColor,
  onColorChange
}) => {
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { toast } = useToast();

  const generateRandomPalette = (): ColorPalette => {
    const hue = Math.floor(Math.random() * 360);
    const colors = [];
    
    for (let i = 0; i < 5; i++) {
      const saturation = 60 + Math.random() * 30; // 60-90%
      const lightness = 30 + i * 15; // 30-90%
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    return {
      name: 'Custom Generated',
      colors,
      description: 'Randomly generated palette'
    };
  };

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
      toast({
        title: "Color Copied!",
        description: `${color} has been copied to clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy color to clipboard.",
        variant: "destructive"
      });
    }
  };

  const selectColor = (color: string) => {
    onColorChange(color);
    toast({
      title: "Color Applied!",
      description: "Your website theme has been updated.",
    });
  };

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const sum = max + min;
    const l = sum / 2;

    let h, s;
    if (diff === 0) {
      h = s = 0;
    } else {
      s = l > 0.5 ? diff / (2 - sum) : diff / sum;
      switch (max) {
        case r: h = ((g - b) / diff + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / diff + 2) / 6; break;
        case b: h = ((r - g) / diff + 4) / 6; break;
        default: h = 0;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Color Palettes</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedPalette(generateRandomPalette())}
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Generate Random
        </Button>
      </div>

      {/* Current Color */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Current Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
              style={{ backgroundColor: currentColor }}
              onClick={() => copyToClipboard(currentColor)}
            />
            <div className="flex-1">
              <p className="font-mono text-sm">{currentColor}</p>
              <p className="text-xs text-slate-500">{hexToHsl(currentColor)}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(currentColor)}
            >
              {copiedColor === currentColor ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Predefined Palettes */}
      <div className="space-y-3">
        {predefinedPalettes.map((palette) => (
          <Card
            key={palette.name}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedPalette?.name === palette.name ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedPalette(palette)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{palette.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  {palette.colors.length} colors
                </Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                {palette.description}
              </p>
              <div className="flex gap-1">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded cursor-pointer border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectColor(color);
                    }}
                    title={color}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Palette Details */}
      {selectedPalette && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="w-4 h-4" />
              {selectedPalette.name}
            </CardTitle>
            <CardDescription>{selectedPalette.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {selectedPalette.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  onClick={() => selectColor(color)}
                >
                  <div
                    className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1">
                    <p className="font-mono text-sm">{color}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(color);
                    }}
                  >
                    {copiedColor === color ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
