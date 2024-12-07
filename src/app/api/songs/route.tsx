// File: app/api/songs/route.ts
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const songs = await sql('SELECT * FROM Songs');
    const artists = await sql('SELECT * FROM Artists');
    const albums = await sql('SELECT * FROM Albums');

    return NextResponse.json({songs, artists, albums});
  } catch (error) {
    console.error('Error fetching songs:', error);
    return NextResponse.json({ error: 'Failed to fetch songs' }, { status: 500 });
  }
}
