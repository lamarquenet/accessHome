'use client';

import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const buttonStyles = {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    backgroundColor: theme === 'light' ? '#3b82f6' : '#4f46e5',
    color: '#ffffff',
    transition: 'background-color 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: theme === 'light' ? '#2563eb' : '#4338ca',
    },
  };

  const hoverStyle = {
    backgroundColor: theme === 'light' ? '#2563eb' : '#4338ca',
  };

  return (
    <button
      onClick={toggleTheme}
      style={buttonStyles}
      onMouseOver={(e) => {
        (e.target as HTMLElement).style.backgroundColor = hoverStyle.backgroundColor;
      }}
      onMouseOut={(e) => {
        (e.target as HTMLElement).style.backgroundColor = buttonStyles.backgroundColor;
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggleButton;