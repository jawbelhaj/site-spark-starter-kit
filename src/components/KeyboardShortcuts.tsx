
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Keyboard, Command } from 'lucide-react';

interface ShortcutAction {
  key: string;
  description: string;
  category: string;
  action: () => void;
}

interface KeyboardShortcutsProps {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
  onPreview: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onUndo,
  onRedo,
  onSave,
  onExport,
  onPreview
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts: ShortcutAction[] = [
    { key: 'Ctrl+Z', description: 'Undo last action', category: 'Edit', action: onUndo },
    { key: 'Ctrl+Y', description: 'Redo last action', category: 'Edit', action: onRedo },
    { key: 'Ctrl+S', description: 'Save project', category: 'File', action: onSave },
    { key: 'Ctrl+E', description: 'Export website', category: 'File', action: onExport },
    { key: 'Ctrl+P', description: 'Preview website', category: 'View', action: onPreview },
    { key: 'Ctrl+/', description: 'Show keyboard shortcuts', category: 'Help', action: () => setIsOpen(true) },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlPressed = event.ctrlKey || event.metaKey;
      
      if (!isCtrlPressed) return;

      switch (event.key.toLowerCase()) {
        case 'z':
          if (!event.shiftKey) {
            event.preventDefault();
            onUndo();
          }
          break;
        case 'y':
          event.preventDefault();
          onRedo();
          break;
        case 's':
          event.preventDefault();
          onSave();
          break;
        case 'e':
          event.preventDefault();
          onExport();
          break;
        case 'p':
          event.preventDefault();
          onPreview();
          break;
        case '/':
          event.preventDefault();
          setIsOpen(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo, onSave, onExport, onPreview]);

  const categories = [...new Set(shortcuts.map(s => s.category))];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Keyboard className="w-4 h-4" />
          <span className="hidden sm:inline">Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Command className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Speed up your workflow with these handy shortcuts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category}>
              <h3 className="font-medium text-sm text-slate-600 dark:text-slate-400 mb-2">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter(shortcut => shortcut.category === category)
                  .map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                      <span className="text-sm">{shortcut.description}</span>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {shortcut.key}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-slate-500 text-center">
            Press <Badge variant="outline" className="font-mono text-xs mx-1">Ctrl+/</Badge> to toggle this dialog
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
