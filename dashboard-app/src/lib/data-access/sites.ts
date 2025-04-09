import { promises as fs } from 'fs';
import path from 'path';
import { Site } from '@/types'; // Using the import alias defined during project setup

// Define the path to the data file relative to the project root
const dataFilePath = path.resolve(process.cwd(), 'data/sites.json');

/**
 * Reads the sites data from the JSON file.
 * Handles file not found by returning an empty array.
 * @returns A promise that resolves to an array of Site objects.
 */
export async function getAllSites(): Promise<Site[]> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data) as Site[];
  } catch (error: any) {
    // If the file doesn't exist, return an empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    // Log other errors and re-throw or handle as appropriate
    console.error('Error reading sites data:', error);
    throw new Error('Could not read sites data.');
  }
}

/**
 * Writes the provided array of sites to the JSON file.
 * Overwrites the existing file content.
 * @param sites The array of Site objects to save.
 * @returns A promise that resolves when the file has been written.
 */
export async function saveAllSites(sites: Site[]): Promise<void> {
  try {
    const data = JSON.stringify(sites, null, 2); // Pretty print JSON
    await fs.writeFile(dataFilePath, data, 'utf-8');
  } catch (error) {
    console.error('Error saving sites data:', error);
    throw new Error('Could not save sites data.');
  }
}