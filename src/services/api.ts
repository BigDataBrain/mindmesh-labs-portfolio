import { Project, Lead, Settings, Credentials } from '../types';
import { INITIAL_PROJECTS_DATA, INITIAL_ADMIN_CREDENTIALS, INITIAL_SETTINGS } from '../constants';

const PROJECTS_KEY = 'mindmesh_projects_v2';
const LEADS_KEY = 'mindmesh_leads_v2';
const SETTINGS_KEY = 'mindmesh_settings_v2';
const CREDS_KEY = 'mindmesh_creds_v2';
const AUTH_KEY = 'mindmesh_auth_v2';

const initializeData = () => {
    if (!localStorage.getItem(PROJECTS_KEY)) {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS_DATA));
    }
    if (!localStorage.getItem(LEADS_KEY)) {
        localStorage.setItem(LEADS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(SETTINGS_KEY)) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
    }
    if (!localStorage.getItem(CREDS_KEY)) {
        localStorage.setItem(CREDS_KEY, JSON.stringify(INITIAL_ADMIN_CREDENTIALS));
    }
};

initializeData();

export const api = {
    // Auth & Credentials
    login: (username?: string, password?: string, secretKey?: string): boolean => {
        const creds = api.getCredentials();
        if (username === creds.username && password === creds.password && secretKey === creds.secretKey) {
            localStorage.setItem(AUTH_KEY, 'true');
            return true;
        }
        return false;
    },
    logout: () => {
        localStorage.removeItem(AUTH_KEY);
    },
    isAuthenticated: (): boolean => {
        return localStorage.getItem(AUTH_KEY) === 'true';
    },
    getCredentials: (): Credentials => {
        const data = localStorage.getItem(CREDS_KEY);
        return data ? JSON.parse(data) : INITIAL_ADMIN_CREDENTIALS;
    },
    updateCredentials: (newCreds: Credentials): Credentials => {
        localStorage.setItem(CREDS_KEY, JSON.stringify(newCreds));
        return newCreds;
    },

    // Projects
    getProjects: (): Project[] => {
        const data = localStorage.getItem(PROJECTS_KEY);
        return data ? JSON.parse(data) : [];
    },
    createProject: (projectData: Omit<Project, 'id'>): Project => {
        const projects = api.getProjects();
        const newProject: Project = { ...projectData, id: Date.now() };
        const updatedProjects = [...projects, newProject];
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
        return newProject;
    },
    updateProject: (updatedProject: Project): Project => {
        let projects = api.getProjects();
        projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
        return updatedProject;
    },
    deleteProject: (projectId: number): void => {
        let projects = api.getProjects();
        const updatedProjects = projects.filter(p => p.id !== projectId);
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
    },

    // Leads
    getLeads: (): Lead[] => {
        const data = localStorage.getItem(LEADS_KEY);
        return data ? JSON.parse(data) : [];
    },
    createLead: (leadData: Omit<Lead, 'id' | 'date'>): Lead => {
        const leads = api.getLeads();
        const newLead: Lead = {
            ...leadData,
            id: Date.now(),
            date: new Date().toISOString(),
        };
        const updatedLeads = [newLead, ...leads];
        localStorage.setItem(LEADS_KEY, JSON.stringify(updatedLeads));
        return newLead;
    },

    // Settings
    getSettings: (): Settings => {
        const data = localStorage.getItem(SETTINGS_KEY);
        return data ? JSON.parse(data) : INITIAL_SETTINGS;
    },
    updateSettings: (newSettings: Settings): Settings => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
        return newSettings;
    }
};