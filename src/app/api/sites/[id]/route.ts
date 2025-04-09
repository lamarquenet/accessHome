import { NextRequest, NextResponse } from 'next/server';
import { getAllSites, saveAllSites } from '@/lib/data-access/sites';
import { Site } from '@/types';

// PUT /api/sites/[id]
export async function PUT(request: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: 'Site ID is required for update' }, { status: 400 });
  }

  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.link || !body.description) {
      return NextResponse.json({ message: 'Missing required fields: name, link, description' }, { status: 400 });
    }

    const sites = await getAllSites();
    const siteIndex = sites.findIndex((site) => site.id === id);

    if (siteIndex === -1) {
      return NextResponse.json({ message: `Site with ID ${id} not found` }, { status: 404 });
    }

    const updatedSite: Site = {
      ...sites[siteIndex],
      name: body.name,
      link: body.link,
      description: body.description,
      thumbnailUrl: body.thumbnailUrl,
    };

    sites[siteIndex] = updatedSite;
    await saveAllSites(sites);

    return NextResponse.json(updatedSite);
  } catch (error) {
    console.error(`API PUT /api/sites/${id} Error:`, error);

    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: 'Invalid JSON format in request body' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Failed to update site' }, { status: 500 });
  }
}

// DELETE /api/sites/[id]
export async function DELETE(request: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  const { id } = await params; // Get the ID from the params object

  if (!id) {
    // This check might be redundant if Next.js guarantees the param, but good practice
    return NextResponse.json({ message: 'Site ID is required for deletion' }, { status: 400 });
  }

  try {
    const sites = await getAllSites();
    const siteIndex = sites.findIndex((site) => site.id === id);

    if (siteIndex === -1) {
      return NextResponse.json({ message: `Site with ID ${id} not found` }, { status: 404 });
    }

    const updatedSites = sites.filter((site) => site.id !== id);
    await saveAllSites(updatedSites);

    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    console.error(`API DELETE /api/sites/${id} Error:`, error);
    return NextResponse.json({ message: 'Failed to delete site' }, { status: 500 });
  }
}
