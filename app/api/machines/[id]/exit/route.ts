import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Machine from '@/lib/models/Machine';

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.pathname.split('/')[3];

    const machine = await Machine.findById(id);
    if (!machine) {
      return NextResponse.json(
        { message: 'Machine not found' },
        { status: 404 }
      );
    }

    machine.exit = new Date();
    machine.status = 'Out';
    await machine.save();

    return NextResponse.json(machine);
  } catch (error) {
    console.error('Mark exit error:', error);
    return NextResponse.json(
      { message: 'Error marking exit', error: String(error) },
      { status: 500 }
    );
  }
}
