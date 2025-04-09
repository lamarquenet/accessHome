import { NextRequest, NextResponse } from 'next/server';
import { getAllSites, saveAllSites } from '@/lib/data-access/sites';
import { Site } from '@/types';
import { randomUUID } from 'crypto'; // Use built-in crypto module

// GET /api/sites
export async function GET() {
  try {
    const sites = await getAllSites();
    return NextResponse.json(sites);
  } catch (error) {
    console.error('API GET /api/sites Error:', error);
    return NextResponse.json({ message: 'Failed to fetch sites' }, { status: 500 });
  }
}

// POST /api/sites
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.link || !body.description) {
      return NextResponse.json({ message: 'Missing required fields: name, link, description' }, { status: 400 });
    }

    const newSite: Site = {
      id: randomUUID(), // Generate unique ID
      name: body.name,
      link: body.link,
      description: body.description,
      thumbnailUrl: body.thumbnailUrl, // Optional
    };

    const sites = await getAllSites();
    sites.push(newSite);
    await saveAllSites(sites);

    return NextResponse.json(newSite, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('API POST /api/sites Error:', error);
    // Handle JSON parsing errors specifically
    if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid JSON format in request body' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create site' }, { status: 500 });
  }
}
