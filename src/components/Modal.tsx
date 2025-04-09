'use client';
import React, { ReactNode, MouseEvent, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string; // Optional title for the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const { theme } = useTheme();
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  
  if (!isOpen) return null;

  // Prevent closing modal when clicking inside the content area
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // Backdrop styles
  const backdropStyles = {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
  };

  // Modal container styles
  const modalContainerStyles = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937', // bg-white : dark:bg-gray-800
    borderRadius: '0.5rem', // rounded-lg
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // shadow-xl
    padding: '1.5rem', // p-6
    width: '100%',
    maxWidth: '28rem', // max-w-md
    margin: '1rem', // m-4
  };

  // Header styles
  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem', // mb-4
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid' as const,
    borderBottomColor: theme === 'light' ? '#e5e7eb' : '#4b5563', // border-b : dark:border-gray-600
    paddingBottom: '0.5rem', // pb-2
  };

  // Title styles
  const titleStyles = {
    fontSize: '1.25rem', // text-xl
    fontWeight: 600, // font-semibold
    color: theme === 'light' ? '#111827' : '#ffffff', // text-gray-900 : dark:text-white
  };

  // Close button styles
  const closeButtonStyles = {
    color: isCloseHovered 
      ? (theme === 'light' ? '#374151' : '#e5e7eb') // hover:text-gray-700 : dark:hover:text-gray-200
      : (theme === 'light' ? '#6b7280' : '#9ca3af'), // text-gray-500 : dark:text-gray-400
    outline: 'none', // focus:outline-none
    cursor: 'pointer',
  };

  // SVG icon styles
  const svgStyles = {
    height: '1.5rem', // h-6
    width: '1.5rem', // w-6
  };

  return (
    <div
      style={backdropStyles}
      onClick={onClose} // Close modal on backdrop click
    >
      <div
        style={modalContainerStyles}
        onClick={handleContentClick} // Prevent closing when clicking inside
      >
        {/* Header: Optional Title and Close Button */}
        <div style={headerStyles}>
          {title && <h2 style={titleStyles}>{title}</h2>}
          <button
            onClick={onClose}
            style={closeButtonStyles}
            aria-label="Close modal"
            onMouseOver={() => setIsCloseHovered(true)}
            onMouseOut={() => setIsCloseHovered(false)}
          >
            {/* Simple X icon */}
            <svg xmlns="http://www.w3.org/2000/svg" style={svgStyles} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;