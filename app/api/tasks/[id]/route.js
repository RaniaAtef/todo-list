import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const { title, description, column, priority, order } = await request.json();

    const task = await Task.findOneAndUpdate(
      { id },
      { title, description, column, priority, order },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task.toJSON());
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update task', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const task = await Task.findOneAndDelete({ id });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete task', details: error.message }, { status: 500 });
  }
}
