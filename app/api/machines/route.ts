import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Machine from '@/lib/models/Machine';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = req.nextUrl.searchParams;
    const technician = searchParams.get('technician');
    const status = searchParams.get('status');
    const region = searchParams.get('region');

    let filter: any = {};
    if (technician) filter.technician = technician;
    if (status) filter.status = status;
    if (region) filter.region = region;

    const machines = await Machine.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(machines);
  } catch (error) {
    console.error('Get machines error:', error);
    return NextResponse.json(
      { message: 'Error fetching machines', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { sn, client, phone, type, brand, region, technician } = await req.json();

    if (!sn || !client || !technician) {
      return NextResponse.json(
        { message: 'Serial number, client, and technician are required' },
        { status: 400 }
      );
    }

    const machine = new Machine({
      sn,
      client,
      phone,
      type,
      brand,
      region,
      technician
    });

    await machine.save();
    return NextResponse.json(machine, { status: 201 });
  } catch (error) {
    console.error('Create machine error:', error);
    return NextResponse.json(
      { message: 'Error creating machine', error: String(error) },
      { status: 500 }
    );
  }
}
