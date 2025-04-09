'use client'; // Required for useState and useEffect

import React, { useState, useEffect, FormEvent } from 'react';
import { Site } from '@/types';
import { useTheme } from '../hooks/useTheme';

// Define the shape of the form data, excluding the 'id'
export type SiteFormData = Omit<Site, 'id'>;

interface SiteFormProps {
  initialData?: Site | null; // Optional initial data for editing
  onSubmit: (data: SiteFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean; // Optional flag to disable button during submission
}

const SiteForm: React.FC<SiteFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<SiteFormData>({
    name: '',
    link: '',
    description: '',
    thumbnailUrl: '',
  });
  const [cancelHovered, setCancelHovered] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  // Populate form if initialData is provided (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        link: initialData.link,
        description: initialData.description || '', // Handle potentially undefined description
        thumbnailUrl: initialData.thumbnailUrl || '', // Handle potentially undefined thumbnailUrl
      });
    } else {
      // Reset form when switching from edit to add mode (or initial load)
      setFormData({ name: '', link: '', description: '', thumbnailUrl: '' });
    }
  }, [initialData]); // Re-run effect when initialData changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    // Basic validation check (can be expanded)
    if (!formData.name || !formData.link) {
      alert('Site Name and Link are required.'); // Simple alert for now
      return;
    }
    onSubmit(formData);
  };

  // Form container styles
  const formStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem', // space-y-4
  };

  // Form field container styles
  const fieldContainerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
  };

  // Label styles
  const labelStyles = {
    display: 'block',
    fontSize: '0.875rem', // text-sm
    fontWeight: 500, // font-medium
    color: theme === 'light' ? '#374151' : '#d1d5db', // text-gray-700 dark:text-gray-300
    marginBottom: '0.25rem',
  };

  // Required field indicator styles
  const requiredFieldStyles = {
    color: '#ef4444', // text-red-500
  };

  // Input styles
  const inputStyles = {
    marginTop: '0.25rem', // mt-1
    display: 'block',
    width: '100%', // w-full
    paddingLeft: '0.75rem', // px-3
    paddingRight: '0.75rem',
    paddingTop: '0.5rem', // py-2
    paddingBottom: '0.5rem',
    backgroundColor: theme === 'light' ? '#ffffff' : '#374151', // bg-white dark:bg-gray-700
    borderWidth: '1px',
    borderStyle: 'solid' as const,
    borderColor: theme === 'light' ? '#d1d5db' : '#4b5563', // border-gray-300 dark:border-gray-600
    borderRadius: '0.375rem', // rounded-md
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // shadow-sm
    fontSize: '0.875rem', // sm:text-sm
    color: theme === 'light' ? '#111827' : '#ffffff', // text-gray-900 dark:text-white
    outline: 'none', // focus:outline-none will be handled with onFocus/onBlur
  };

  // Textarea specific styles
  const textareaStyles = {
    ...inputStyles,
    resize: 'none' as const, // resize-none
  };

  // Form actions container styles
  const actionsContainerStyles = {
    display: 'flex',
    justifyContent: 'flex-end', // justify-end
    gap: '0.75rem', // space-x-3
    paddingTop: '1rem', // pt-4
  };

  // Cancel button styles
  const cancelButtonStyles = {
    paddingLeft: '1rem', // px-4
    paddingRight: '1rem',
    paddingTop: '0.5rem', // py-2
    paddingBottom: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid' as const,
    borderColor: theme === 'light' ? '#d1d5db' : '#4b5563', // border-gray-300 dark:border-gray-600
    borderRadius: '0.375rem', // rounded-md
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // shadow-sm
    fontSize: '0.875rem', // text-sm
    fontWeight: 500, // font-medium
    color: theme === 'light' ? '#374151' : '#d1d5db', // text-gray-700 dark:text-gray-300
    backgroundColor: theme === 'light' 
      ? (cancelHovered ? '#f9fafb' : '#ffffff') // hover:bg-gray-50 : bg-white
      : (cancelHovered ? '#4b5563' : '#374151'), // dark:hover:bg-gray-600 : dark:bg-gray-700
    opacity: isSubmitting ? 0.5 : 1, // disabled:opacity-50
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    transition: 'background-color 150ms ease-in-out',
    outline: 'none', // focus:outline-none
  };

  // Submit button styles
  const submitButtonStyles = {
    paddingLeft: '1rem', // px-4
    paddingRight: '1rem',
    paddingTop: '0.5rem', // py-2
    paddingBottom: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid' as const,
    borderColor: 'transparent', // border-transparent
    borderRadius: '0.375rem', // rounded-md
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // shadow-sm
    fontSize: '0.875rem', // text-sm
    fontWeight: 500, // font-medium
    color: '#ffffff', // text-white
    backgroundColor: submitHovered ? '#4f46e5' : '#4338ca', // hover:bg-indigo-700 : bg-indigo-600
    opacity: isSubmitting ? 0.5 : 1, // disabled:opacity-50
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    transition: 'background-color 150ms ease-in-out',
    outline: 'none', // focus:outline-none
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <div style={fieldContainerStyles}>
        <label htmlFor="name" style={labelStyles}>
          Site Name <span style={requiredFieldStyles}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyles}
          placeholder="e.g., My Portfolio"
          disabled={isSubmitting}
        />
      </div>
      <div style={fieldContainerStyles}>
        <label htmlFor="link" style={labelStyles}>
          Link <span style={requiredFieldStyles}>*</span>
        </label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
          style={inputStyles}
          placeholder="https://example.com"
          disabled={isSubmitting}
        />
      </div>
      <div style={fieldContainerStyles}>
        <label htmlFor="description" style={labelStyles}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          style={textareaStyles}
          placeholder="A brief description of the site."
          disabled={isSubmitting}
        />
      </div>
      <div style={fieldContainerStyles}>
        <label htmlFor="thumbnailUrl" style={labelStyles}>
          Thumbnail URL
        </label>
        <input
          type="url"
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          style={inputStyles}
          placeholder="https://example.com/image.jpg"
          disabled={isSubmitting}
        />
      </div>

      {/* Form Actions */}
      <div style={actionsContainerStyles}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          style={cancelButtonStyles}
          onMouseOver={() => setCancelHovered(true)}
          onMouseOut={() => setCancelHovered(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          style={submitButtonStyles}
          onMouseOver={() => setSubmitHovered(true)}
          onMouseOut={() => setSubmitHovered(false)}
        >
          {isSubmitting ? 'Saving...' : (initialData ? 'Update Site' : 'Add Site')}
        </button>
      </div>
    </form>
  );
};

export default SiteForm;