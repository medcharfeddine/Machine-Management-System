import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Machine from '@/lib/models/Machine';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.pathname.split('/')[3];
    const { note, tech } = await req.json();

    if (!note) {
      return NextResponse.json(
        { message: 'Repair note is required' },
        { status: 400 }
      );
    }

    const machine = await Machine.findById(id);
    if (!machine) {
      return NextResponse.json(
        { message: 'Machine not found' },
        { status: 404 }
      );
    }

    machine.repairs.push({
      note,
      tech: tech || machine.technician,
      date: new Date()
    });

    await machine.save();
    return NextResponse.json(machine);
  } catch (error) {
    console.error('Add repair error:', error);
    return NextResponse.json(
      { message: 'Error adding repair', error: String(error) },
      { status: 500 }
    );
  }
}
