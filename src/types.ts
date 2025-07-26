export interface Project {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  projectUrl: string;
  technologies: string[];
  complexity: number; // A score from 1-10
  projectDate: string;
  isActive: boolean;
  avatar: string; 
  avatarColor: string;
  created_at: string;
}

export interface Lead {
    id: number;
    email: string;
    phone: string;
    projectId: number;
    projectName: string;
    date: string;
    created_at: string;
}

export interface Settings {
    id: number;
    contactEmail: string;
    siteTitle: string;
    siteTagline: string;
    aboutMe: string;
}