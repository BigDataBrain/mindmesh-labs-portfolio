import { supabase } from './supabase';
import { Project, Lead, Settings } from '../types';
import { AuthError, Session, Subscription } from '@supabase/supabase-js';


export const api = {
    // === AUTH ===
    login: async (email: string, password: string): Promise<{ session: Session | null; error: AuthError | null; }> => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        return { session: data.session, error };
    },

    logout: async (): Promise<{ error: AuthError | null }> => {
        return await supabase.auth.signOut();
    },
    
    getSession: async (): Promise<Session | null> => {
        const { data } = await supabase.auth.getSession();
        return data.session;
    },

    onAuthStateChange: (callback: (event: string, session: Session | null) => void): { subscription: Subscription } => {
        const { data: authListener } = supabase.auth.onAuthStateChange(callback);
        return { subscription: authListener.subscription };
    },


    // === PROJECTS ===
    getProjects: async (): Promise<Project[]> => {
        const { data, error } = await supabase.from('projects').select('*').order('projectDate', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    createProject: async (projectData: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
        const { data, error } = await supabase
            .from('projects')
            .insert([projectData])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    updateProject: async (updatedProject: Project): Promise<Project> => {
        const { id, created_at, ...projectToUpdate } = updatedProject;
        const { data, error } = await supabase
            .from('projects')
            .update(projectToUpdate)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    deleteProject: async (projectId: number): Promise<void> => {
        const { error } = await supabase.from('projects').delete().eq('id', projectId);
        if (error) throw error;
    },

    // === LEADS ===
    getLeads: async (): Promise<Lead[]> => {
        const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    createLead: async (leadData: Omit<Lead, 'id' | 'created_at' | 'date'>): Promise<Lead> => {
        const leadToInsert = { ...leadData, date: new Date().toISOString() };
        const { data, error } = await supabase
            .from('leads')
            .insert([leadToInsert])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // === SETTINGS ===
    getSettings: async (): Promise<Settings> => {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .limit(1)
            .single();

        if (error) {
            console.error("Error fetching settings, returning fallback.", error);
            // This ensures the app doesn't crash if settings can't be fetched on first load.
            return { id: 1, siteTitle: 'MindMesh Labs', siteTagline: 'Portfolio', aboutMe: 'Welcome!', contactEmail: '' };
        }
        return data;
    },

    updateSettings: async (newSettings: Omit<Settings, 'id'>): Promise<Settings> => {
        // The settings table is assumed to have a single row with id=1
        const { data, error } = await supabase
            .from('settings')
            .update(newSettings)
            .eq('id', 1) 
            .select()
            .single();
        if (error) throw error;
        return data;
    }
};