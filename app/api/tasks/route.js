import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('_page')) || 1;
    const perPage = parseInt(searchParams.get('_per_page')) || 10;
    const skip = (page - 1) * perPage;

    const [tasks, totalItems] = await Promise.all([
      Task.find().sort({ _id: 1 }).skip(skip).limit(perPage).lean(),
      Task.countDocuments()
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    // Format response to behave exactly like json-server v1
    const response = {
      first: 1,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? page + 1 : null,
      last: totalPages,
      pages: totalPages,
      items: totalItems,
      data: tasks
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks', details: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { title, description, column, priority } = body;
    const newId = body.id || Math.random().toString(36).substring(2, 9);

    const task = await Task.create({ id: newId, title, description, column, priority });

    return NextResponse.json(task.toJSON(), { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to create task', details: error.message }, { status: 500 });
  }
}
