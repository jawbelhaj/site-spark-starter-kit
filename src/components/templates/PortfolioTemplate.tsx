
import React from 'react';
import { WebsiteConfig } from '../WebsiteBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PortfolioTemplateProps {
  config: WebsiteConfig;
}

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Full-stack web application with React and Node.js',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    tech: ['React', 'Node.js', 'MongoDB'],
    category: 'Web Development'
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure mobile application for financial transactions',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    tech: ['React Native', 'Firebase', 'Redux'],
    category: 'Mobile App'
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for business analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tech: ['D3.js', 'Python', 'PostgreSQL'],
    category: 'Data Science'
  }
];

export const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({ config }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
              <a href="#projects" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
            </div>
            <Button size="sm" style={{ backgroundColor: config.primaryColor }}>
              Hire Me
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center text-4xl text-white font-bold">
              JD
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                John Developer
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Full-Stack Developer & UI/UX Designer passionate about creating digital experiences that make a difference.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Node.js</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">UI/UX</Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" style={{ backgroundColor: config.primaryColor }}>
                View My Work
              </Button>
              <Button variant="outline" size="lg">
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                I'm a passionate developer with 5+ years of experience creating digital solutions that solve real-world problems. My expertise spans across full-stack development, with a keen eye for design and user experience.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Vue.js</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">PostgreSQL</Badge>
                    <Badge variant="outline">AWS</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt="Profile"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Some of my recent work
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">{project.category}</Badge>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Live
                    </Button>
                    <Button size="sm" variant="outline">
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8">
            Let's Work Together
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
            Have a project in mind? I'd love to hear about it.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl mb-4">📧</div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-slate-600 dark:text-slate-300">john@example.com</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl mb-4">💼</div>
                <h3 className="font-semibold mb-2">LinkedIn</h3>
                <p className="text-slate-600 dark:text-slate-300">@johndeveloper</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl mb-4">🐙</div>
                <h3 className="font-semibold mb-2">GitHub</h3>
                <p className="text-slate-600 dark:text-slate-300">@johndeveloper</p>
              </CardContent>
            </Card>
          </div>
          <Button size="lg" style={{ backgroundColor: config.primaryColor }}>
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 John Developer. Built with passion and coffee ☕
          </p>
        </div>
      </footer>
    </div>
  );
};
