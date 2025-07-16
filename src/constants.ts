import { Project, Settings, Credentials } from './types';

export const INITIAL_PROJECTS_DATA: Project[] = [
  {
    id: 1,
    name: 'AI Agent Dashboard',
    shortDescription: 'A platform to manage and monitor intelligent AI agents.',
    longDescription: 'This project is a full-featured dashboard built with React, TypeScript, and Tailwind CSS. It provides real-time monitoring, filtering, and management capabilities for a fleet of AI agents. The data is persisted using local storage to simulate a backend.',
    projectUrl: 'https://github.com/example/ai-dashboard',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
    complexity: 9.9,
    projectDate: '2024-03-01',
    isActive: true,
    avatar: 'robot-1',
    avatarColor: 'bg-teal-500',
  },
  {
    id: 2,
    name: 'E-commerce Platform',
    shortDescription: 'A scalable online store with a custom CMS and payment integration.',
    longDescription: 'A complete e-commerce solution using the MERN stack. Features include product management, user authentication with JWT, a shopping cart, and Stripe for payment processing. The front-end is a responsive SPA built with React.',
    projectUrl: 'https://github.com/example/ecommerce',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    complexity: 8.8,
    projectDate: '2024-02-10',
    isActive: true,
    avatar: 'robot-2',
    avatarColor: 'bg-yellow-500',
  },
  {
    id: 3,
    name: 'Python Data Scraper',
    shortDescription: 'A web scraping tool for collecting and processing financial data.',
    longDescription: 'Developed a Python-based web scraper using BeautifulSoup and Scrapy to gather data from multiple financial news websites. The data is then cleaned, processed with Pandas, and stored in a PostgreSQL database for analysis.',
    projectUrl: 'https://github.com/example/data-scraper',
    technologies: ['Python', 'Scrapy', 'BeautifulSoup', 'Pandas'],
    complexity: 7.6,
    projectDate: '2024-01-05',
    isActive: false,
    avatar: 'robot-3',
    avatarColor: 'bg-yellow-400',
  },
];

export const INITIAL_ADMIN_CREDENTIALS: Credentials = {
    username: 'admin',
    password: 'password123',
    secretKey: '12345-67890-12345'
};

export const INITIAL_SETTINGS: Settings = {
    contactEmail: 'your-email@example.com',
    siteTitle: 'MindMesh Labs',
    siteTagline: 'Built by Devs. Backed by AI.',
    aboutMe: 'Welcome to my portfolio! I am a passionate developer specializing in creating modern, responsive, and user-friendly web applications. With a strong foundation in both front-end and back-end technologies, I enjoy bringing ideas to life and solving complex problems. Feel free to browse my work and get in touch!'
};