import React, { useState, useEffect } from 'react';

interface BootLoaderProps {
    onBootComplete: () => void;
}

const bootMessages = [
    { text: 'Initializing MindMesh Core...', delay: 150 },
    { text: 'Loading quantum entanglement module...', delay: 300 },
    { text: 'Compiling neural networks...', delay: 200 },
    { text: 'Syncing with holo-grid...', delay: 400 },
    { text: 'Decompressing asset matrix...', delay: 250 },
    { text: 'Calibrating temporal flux capacitor...', delay: 350 },
    { text: 'System Online. Welcome.', delay: 500 },
];

const BootLoader: React.FC<BootLoaderProps> = ({ onBootComplete }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        if (messageIndex < bootMessages.length) {
            const timer = setTimeout(() => {
                setMessageIndex(prevIndex => prevIndex + 1);
            }, bootMessages[messageIndex].delay);
            return () => clearTimeout(timer);
        } else {
            const finalTimer = setTimeout(onBootComplete, 500);
            return () => clearTimeout(finalTimer);
        }
    }, [messageIndex, onBootComplete]);

    return (
        <div className="fixed inset-0 bg-[#010409] flex flex-col items-center justify-center font-mono text-cyan-300 z-[100]">
            <div className="w-full max-w-lg p-4">
                <h1 className="text-4xl mb-8 boot-loader-text">MindMesh Labs</h1>
                <div className="text-left">
                    {bootMessages.slice(0, messageIndex).map((msg, index) => (
                         <p key={index} className="text-sm">
                            <span className="text-green-400">&gt; </span>{msg.text}
                        </p>
                    ))}
                </div>
                {messageIndex < bootMessages.length && (
                    <div className="flex items-center mt-2">
                        <span className="text-green-400">&gt; </span>
                        <span className="h-4 w-2 bg-cyan-300 animate-ping ml-2"></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BootLoader;