import React, { useState, useEffect, useCallback } from 'react';
import { Project, Lead, Settings } from '../types';
import { api } from '../services/api';
import Header from '../components/Header';
import ProjectGrid from '../components/ProjectGrid';
import Modal from '../components/Modal';
import ProjectForm from '../components/ProjectForm';
import Footer from '../components/Footer';
import StatsSummary from '../components/StatsSummary';
import LeadLogTable from '../components/LeadLogTable';
import AdminSettings from '../components/AdminSettings';
import CredentialsSettings from '../components/CredentialsSettings';
import { UserIcon, WrenchScrewdriverIcon } from '../components/Icons';

interface AdminDashboardProps {
    onLogout: () => void;
    onGoToPublic: () => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

type AdminView = 'projects' | 'settings';
type SettingsView = 'general' | 'security';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onGoToPublic, theme, toggleTheme }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [settings, setSettings] = useState<Settings>(api.getSettings());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [currentView, setCurrentView] = useState<AdminView>('projects');
    const [currentSettingsView, setCurrentSettingsView] = useState<SettingsView>('general');

    const loadData = useCallback(() => {
        setProjects(api.getProjects());
        setLeads(api.getLeads());
        setSettings(api.getSettings());
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleOpenCreateModal = () => {
        setEditingProject(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (project: Project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    const handleFormSubmit = (projectData: Omit<Project, 'id'> | Project) => {
        if ('id' in projectData) {
            api.updateProject(projectData as Project);
        } else {
            api.createProject(projectData);
        }
        loadData();
        handleCloseModal();
    };
    
    const handleDeleteProject = (projectId: number) => {
        api.deleteProject(projectId);
        loadData();
    };

    const handleToggleStatus = (projectId: number) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            api.updateProject({ ...project, isActive: !project.isActive });
            loadData();
        }
    };

    const sortedProjects = [...projects].sort((a,b) => new Date(b.projectDate).getTime() - new Date(a.projectDate).getTime());

    const NavButton: React.FC<{
        isActive: boolean;
        onClick: () => void;
        children: React.ReactNode;
    }> = ({ isActive, onClick, children }) => (
        <button
        onClick={onClick}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#21262d]'
        }`}
        >
        {children}
        </button>
    );
    
    const SettingsTabButton: React.FC<{
        isActive: boolean;
        onClick: () => void;
        children: React.ReactNode;
    }> = ({ isActive, onClick, children }) => (
         <button
            onClick={onClick}
            className={`px-4 py-2 font-medium text-sm rounded-md ${
                isActive ? 'bg-gray-200 dark:bg-[#30363d] text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#21262d]'
            }`}
        >
            {children}
        </button>
    );


    return (
        <div className="bg-gray-100 dark:bg-[#0D1117] min-h-screen">
            <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Header 
                    onRefresh={loadData}
                    title="Admin Dashboard"
                    subtitle="Manage your projects, leads, and settings."
                    theme={theme}
                    toggleTheme={toggleTheme}
                    showLogout={true}
                    onLogout={onLogout}
                />
                
                <div className="flex justify-between items-center my-8">
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-[#0D1117] border border-gray-300 dark:border-[#30363d] p-1 rounded-lg">
                        <NavButton isActive={currentView === 'projects'} onClick={() => setCurrentView('projects')}>
                            <WrenchScrewdriverIcon className="w-4 h-4" />
                            <span>Projects</span>
                        </NavButton>
                        <NavButton isActive={currentView === 'settings'} onClick={() => setCurrentView('settings')}>
                            <UserIcon className="w-4 h-4" />
                            <span>Settings</span>
                        </NavButton>
                    </div>
                     <button onClick={onGoToPublic} className="text-sm text-blue-500 hover:underline">
                        Preview Public Site &rarr;
                    </button>
                </div>
                
                {currentView === 'projects' && (
                    <>
                        <StatsSummary projects={projects} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-6">Projects</h2>
                        <ProjectGrid 
                            projects={sortedProjects} 
                            mode="admin"
                            onCreateProject={handleOpenCreateModal}
                            onEditProject={handleOpenEditModal}
                            onDeleteProject={handleDeleteProject}
                            onToggleStatus={handleToggleStatus}
                        />
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-6">Lead Log</h2>
                         <LeadLogTable leads={leads} />
                    </>
                )}

                {currentView === 'settings' && (
                    <div className="bg-white dark:bg-[#161B22] border border-gray-200 dark:border-[#30363d] rounded-lg p-6">
                        <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-[#30363d] pb-4 mb-6">
                            <SettingsTabButton isActive={currentSettingsView === 'general'} onClick={() => setCurrentSettingsView('general')}>General</SettingsTabButton>
                            <SettingsTabButton isActive={currentSettingsView === 'security'} onClick={() => setCurrentSettingsView('security')}>Security</SettingsTabButton>
                        </div>
                        {currentSettingsView === 'general' && <AdminSettings onSettingsUpdate={loadData} />}
                        {currentSettingsView === 'security' && <CredentialsSettings />}
                    </div>
                )}
            </main>
            <Footer onGoToAdmin={() => {}} />
            
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProject ? 'Edit Project' : 'Create New Project'}
            >
                <ProjectForm 
                    onSubmit={handleFormSubmit}
                    onClose={handleCloseModal}
                    initialData={editingProject}
                />
            </Modal>
        </div>
    );
};

export default AdminDashboard;
