import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import ProjectGrid from '../components/ProjectGrid';
import Footer from '../components/Footer';
import LeadCaptureModal from '../components/LeadCaptureModal';
import ProjectDetailModal from '../components/ProjectDetailModal';
import ContactForm from '../components/ContactForm';
import { Project, Settings } from '../types';
import { api } from '../services/api';

interface PublicPortfolioProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onGoToAdmin: () => void;
}

const PublicPortfolio: React.FC<PublicPortfolioProps> = ({ theme, toggleTheme, onGoToAdmin }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<Settings>(api.getSettings());
  const [searchTerm, setSearchTerm] = useState('');
  const [techFilter, setTechFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Most Recent');
  
  const [isLeadModalOpen, setLeadModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const allProjects = api.getProjects();
    setProjects(allProjects.filter(p => p.isActive));
    setSettings(api.getSettings());
  }, []);

  const handleReset = useCallback(() => {
    setSearchTerm('');
    setTechFilter('All');
    setSortBy('Most Recent');
  }, []);

  const availableTechs = useMemo(() => {
    const allTechs = new Set(projects.flatMap(p => p.technologies));
    return Array.from(allTechs).sort();
  }, [projects]);
  
  const handleOpenLeadModal = (project: Project) => {
    setSelectedProject(project);
    setLeadModalOpen(true);
  };
  
  const handleOpenDetailModal = (project: Project) => {
    setSelectedProject(project);
    setDetailModalOpen(true);
  };

  const handleLeadSubmit = (email: string, phone: string) => {
    if (selectedProject) {
        api.createLead({ email, phone, projectId: selectedProject.id, projectName: selectedProject.name });
        setLeadModalOpen(false);
        window.open(selectedProject.projectUrl, '_blank');
        setSelectedProject(null);
    }
  };

  const filteredAndSortedProjects = useMemo(() => {
    return projects
      .filter(project => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          searchLower.trim() === '' ||
          project.name.toLowerCase().includes(searchLower) ||
          project.shortDescription.toLowerCase().includes(searchLower) ||
          project.technologies.some(t => t.toLowerCase().includes(searchLower));
        const matchesTech = techFilter === 'All' || project.technologies.includes(techFilter);
        return matchesSearch && matchesTech;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'Complexity High to Low': return b.complexity - a.complexity;
          case 'Complexity Low to High': return a.complexity - b.complexity;
          case 'Most Recent':
          default: return new Date(b.projectDate).getTime() - new Date(a.projectDate).getTime();
        }
      });
  }, [projects, searchTerm, techFilter, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Header 
            title={settings.siteTitle}
            subtitle={settings.siteTagline}
            aboutMe={settings.aboutMe}
            onRefresh={handleReset} 
            theme={theme} 
            toggleTheme={toggleTheme}
        />
        <div className="border-b border-gray-200 dark:border-[#30363d] my-8"></div>
        <FilterBar
          searchTerm={searchTerm} onSearchTermChange={setSearchTerm}
          techFilter={techFilter} onTechFilterChange={setTechFilter}
          availableTechs={availableTechs}
          sortBy={sortBy} onSortByChange={setSortBy}
        />
        {filteredAndSortedProjects.length > 0 ? (
           <ProjectGrid 
                projects={filteredAndSortedProjects} 
                mode="public" 
                onViewDetails={handleOpenLeadModal}
                onSeeMore={handleOpenDetailModal}
            />
        ) : (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <h3 className="text-xl font-semibold">No Projects Found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
        <div className="border-b border-gray-200 dark:border-[#30363d] my-12"></div>
        <ContactForm />
      </main>
      <Footer onGoToAdmin={onGoToAdmin} />
      {selectedProject && (
        <LeadCaptureModal
            isOpen={isLeadModalOpen}
            onClose={() => setLeadModalOpen(false)}
            onSubmit={handleLeadSubmit}
            projectName={selectedProject.name}
        />
      )}
       {selectedProject && (
        <ProjectDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            project={selectedProject}
        />
       )}
    </div>
  );
}

export default PublicPortfolio;
