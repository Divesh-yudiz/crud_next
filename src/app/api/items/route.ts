import { connectDB } from '@/lib/mongodb';
import { UserDetail } from '@/models/item';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    const items = await UserDetail.find();
    return NextResponse.json(items);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
        //     return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        // }

        await connectDB();
        const newItem = await UserDetail.create({ name: body.name, email: body.email, password: body.password });
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error("POST /api/items error:", error);
        return NextResponse.json(
            { error: (error as Error).message || "Internal Server Error" },
            { status: 500 }
        );
    }
}