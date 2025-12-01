import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Technician from '@/lib/models/Technician';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await Technician.findOne({ username });
    if (existing) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }

    // Create new technician
    const technician = new Technician({ username, password });
    await technician.save();

    return NextResponse.json(
      { message: 'Technician registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Error registering technician', error: String(error) },
      { status: 500 }
    );
  }
}
