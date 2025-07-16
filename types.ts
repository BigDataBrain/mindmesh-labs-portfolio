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
}

export interface Lead {
    id: number;
    email: string;
    phone: string;
    projectId: number;
    projectName: string;
    date: string;
}

export interface Credentials {
    username: string;
    password: string;
    secretKey: string;
}

export interface Settings {
    contactEmail: string;
    siteTitle: string;
    siteTagline: string;
    aboutMe: string;
}
