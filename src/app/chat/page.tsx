'use client'
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ChatPage = () => {
  const { theme } = useTheme();

  // Main container styles
  const mainContainerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '1rem', // p-4
    textAlign: 'center' as const,
  };

  // Title container styles
  const titleContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem', // space-x-2
    fontSize: '1.125rem', // text-lg
    fontWeight: 600, // font-semibold
    color: theme === 'light' ? '#374151' : '#d1d5db', // text-gray-700 dark:text-gray-300
  };

  // Paragraph styles
  const paragraphStyles = {
    marginTop: '0.5rem', // mt-2
    fontSize: '0.875rem', // text-sm
    color: theme === 'light' ? '#6b7280' : '#9ca3af', // text-gray-500 dark:text-gray-400
  };

  return (
    <main style={mainContainerStyles}>
      <div style={titleContainerStyles}>
        <span>🚧</span>
        <h1>Chat LLM - Work in Progress</h1>
        <span>🚧</span>
      </div>
      <p style={paragraphStyles}>
        This section is currently under construction.
      </p>
    </main>
  );
};

export default ChatPage;