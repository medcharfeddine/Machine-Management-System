import { connectDB } from '@/lib/mongodb';
import Machine from '@/lib/models/Machine';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; repairId: string }> }
) {
  try {
    await connectDB();
    const { note } = await request.json();
    const { id, repairId } = await params;

    if (!note || !note.trim()) {
      return NextResponse.json({ error: 'Repair note is required' }, { status: 400 });
    }

    const machine = await Machine.findById(id);
    if (!machine) {
      return NextResponse.json({ error: 'Machine not found' }, { status: 404 });
    }

    const repair = machine.repairs.find((r: any) => r._id.toString() === repairId);
    if (!repair) {
      return NextResponse.json({ error: 'Repair not found' }, { status: 404 });
    }

    repair.note = note;
    await machine.save();

    return NextResponse.json(repair, { status: 200 });
  } catch (error) {
    console.error('Error updating repair:', error);
    return NextResponse.json({ error: 'Failed to update repair' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; repairId: string }> }
) {
  try {
    await connectDB();
    const { id, repairId } = await params;

    const machine = await Machine.findById(id);
    if (!machine) {
      return NextResponse.json({ error: 'Machine not found' }, { status: 404 });
    }

    machine.repairs = machine.repairs.filter((r: any) => r._id.toString() !== repairId);
    await machine.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting repair:', error);
    return NextResponse.json({ error: 'Failed to delete repair' }, { status: 500 });
  }
}
