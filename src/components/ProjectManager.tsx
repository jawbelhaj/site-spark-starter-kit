
import React, { useState, useEffect } from 'react';
import { SaveProjectDialog } from './SaveProjectDialog';
import { LoadProjectDialog } from './LoadProjectDialog';
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
  const { toast } = useToast();

  useEffect(() => {
    const savedProjects = localStorage.getItem('website-builder-projects');
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      setProjects(parsed.map((p: any) => ({ ...p, lastModified: new Date(p.lastModified) })));
    }
  }, []);

  const saveProject = (projectName: string, projectDescription: string) => {
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

    onSaveProject();
  };

  const loadProject = (project: Project) => {
    onLoadProject(project.config);
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
      <SaveProjectDialog onSave={saveProject} />
      <LoadProjectDialog 
        projects={projects}
        onLoad={loadProject}
        onDelete={deleteProject}
      />
    </div>
  );
};
