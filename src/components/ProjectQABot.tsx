import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { askAboutProject } from '../services/ai';
import { SendIcon, UserIcon, SparklesIcon } from './Icons';

interface ProjectQABotProps {
    project: Project;
}

type Message = {
    sender: 'user' | 'ai';
    text: string;
}

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : ''}`}>
             {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-blue-400" />
                </div>
            )}
            <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-[#21262d] text-gray-800 dark:text-gray-200'}`}>
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
            </div>
            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                </div>
            )}
        </div>
    );
};


const ProjectQABot: React.FC<ProjectQABotProps> = ({ project }) => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: `I am an AI assistant with knowledge about the "${project.name}" project. Ask me anything about its details!` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError('');

        try {
            const aiResponse = await askAboutProject(project.longDescription, input);
            const aiMessage: Message = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Sorry, I couldn't get a response. ${errorMessage}`);
            const aiErrorMessage: Message = { sender: 'ai', text: `I seem to be having trouble connecting. Please check your API key setup and try again.` };
            setMessages(prev => [...prev, aiErrorMessage]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="border border-gray-200 dark:border-[#30363d] rounded-lg bg-white dark:bg-[#161B22]/50 flex flex-col h-96">
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
                 {isLoading && (
                    <div className="flex items-start gap-3 my-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                             <SparklesIcon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="max-w-xs p-3 rounded-lg bg-gray-200 dark:bg-[#21262d]">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-xs px-4 pb-2 text-center">{error}</p>}
            <div className="border-t border-gray-200 dark:border-[#30363d] p-3">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., What was the main challenge?"
                        disabled={isLoading}
                        className="flex-1 bg-gray-100 dark:bg-[#010409] border border-gray-300 dark:border-[#30363d] text-gray-900 dark:text-gray-300 rounded-md block w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors">
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectQABot;