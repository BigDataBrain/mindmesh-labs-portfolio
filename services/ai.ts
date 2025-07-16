// IMPORTANT: The original AI functionality has been disabled for the build process
// to allow deployment on static hosting platforms like GitHub Pages.
// The `process.env.API_KEY` is not available in the browser's build environment,
// causing an error. The code below provides a mock response.
// To re-enable AI, you would need to run this in a local development
// environment with a configured .env file and restore this file's contents
// from your version control system (e.g., git).

export const askAboutProject = async (projectContext: string, question: string): Promise<string> => {
    console.log("AI functionality is currently disabled for this deployment build. Returning a mock response.", { projectContext, question });
    
    // Simulate a network delay to make it feel like a real API call
    await new Promise(resolve => setTimeout(resolve, 500));

    return "The AI assistant is currently offline. This feature is disabled in the deployed version to allow the project to build successfully. To use this feature, please run the project in a local development environment with a valid API key.";
};
