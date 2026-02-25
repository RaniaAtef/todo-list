import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    await connectToDatabase();

    // Ensure the index exists on our custom 'id' field
    await Task.init();

    // Read tasks from db.json to seed MongoDB
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbData = fs.readFileSync(dbPath, 'utf8');
    const { tasks } = JSON.parse(dbData);

    let insertedCount = 0;

    if (tasks && tasks.length > 0) {
      for (const task of tasks) {
        // Use updateOne with upsert to avoid duplicate errors
        const result = await Task.updateOne(
          { id: task.id },
          { $setOnInsert: task },
          { upsert: true }
        );
        if (result.upsertedCount > 0) {
          insertedCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `MongoDB collection ready. Seeded ${insertedCount} new tasks.`,
    });
  } catch (error) {
    console.error('Setup Error:', error);
    return NextResponse.json({ error: 'Failed to setup database', details: error.message }, { status: 500 });
  }
}
