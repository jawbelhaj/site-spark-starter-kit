
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Save, FolderOpen, Plus, Trash2, Edit3 } from 'lucide-react';
import { WebsiteConfig } from './WebsiteBuilder';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  name: string;
  description: string;
  config: WebsiteConfig;
  lastModified: Date;
  thumbnail?: string;
}

interface ProjectManagerProps {
  currentConfig: WebsiteConfig;
  onLoadProject: (config: WebsiteConfig) => void;
  onSaveProject: () => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  currentConfig,
  onLoadProject,
  onSaveProject
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedProjects = localStorage.getItem('website-builder-projects');
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      setProjects(parsed.map((p: any) => ({ ...p, lastModified: new Date(p.lastModified) })));
    }
  }, []);

  const saveProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName || `Project ${projects.length + 1}`,
      description: projectDescription || 'No description',
      config: currentConfig,
      lastModified: new Date()
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('website-builder-projects', JSON.stringify(updatedProjects));
    
    toast({
      title: "Project Saved!",
      description: `${newProject.name} has been saved successfully.`,
    });

    setProjectName('');
    setProjectDescription('');
    setSaveDialogOpen(false);
    onSaveProject();
  };

  const loadProject = (project: Project) => {
    onLoadProject(project.config);
    setIsOpen(false);
    toast({
      title: "Project Loaded!",
      description: `${project.name} has been loaded successfully.`,
    });
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('website-builder-projects', JSON.stringify(updatedProjects));
    toast({
      title: "Project Deleted",
      description: "Project has been removed from your library.",
    });
  };

  return (
    <div className="flex gap-2">
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Project</DialogTitle>
            <DialogDescription>
              Save your current website project to continue working on it later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="My Awesome Website"
              />
            </div>
            <div>
              <Label htmlFor="project-description">Description</Label>
              <Input
                id="project-description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Brief description of your project"
              />
            </div>
            <Button onClick={saveProject} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <FolderOpen className="w-4 h-4 mr-2" />
            Load
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your Projects</DialogTitle>
            <DialogDescription>
              Load a previously saved project or start fresh.
            </DialogDescription>
          </DialogHeader>
          
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">No saved projects yet</p>
              <p className="text-sm text-slate-500">Create and save your first project to see it here</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base line-clamp-1">{project.name}</CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="capitalize">
                        {project.config.template}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {project.lastModified.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        <strong>Title:</strong> {project.config.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        <strong>Theme:</strong> {project.config.theme}
                      </div>
                    </div>
                    <Button 
                      onClick={() => loadProject(project)}
                      className="w-full mt-3"
                      size="sm"
                    >
                      Load Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
