import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Technician from '@/lib/models/Technician';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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

    // Find technician
    const technician = await Technician.findOne({ username, password });
    if (!technician) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: technician._id, username: technician.username },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return NextResponse.json({
      token,
      username: technician.username,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Error logging in', error: String(error) },
      { status: 500 }
    );
  }
}
