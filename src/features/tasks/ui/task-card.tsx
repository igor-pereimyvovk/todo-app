'use client';

import { useState } from 'react';
import { Task } from '@/features/tasks/api/getTasks';
import { updateTask } from '@/features/tasks/api/updateTask';
import { deleteTask } from '@/features/tasks/api/deleteTask';
import { Input } from '@/shared/ui/kit/input';
import { Button } from '@/shared/ui/kit/button';
import { Textarea } from '@/shared/ui/kit/textarea';

type TaskCardProps = {
  task: Task;
  onAction: () => void;
};

export function TaskCard({ task, onAction }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const toggleCompleted = async () => {
    await updateTask(task.id, { completed: !task.completed });
    onAction();
  };

  const handleSave = async () => {
    await updateTask(task.id, { title, description });
    setIsEditing(false);
    onAction();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    onAction();
  };

  return (
    <div className="border rounded-xl p-4 space-y-2 shadow-sm">
      <div className="flex justify-between items-center">
        <input type="checkbox" checked={task.completed} onChange={toggleCompleted} />
        <Button size="sm" variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>

      {isEditing ? (
        <>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div onDoubleClick={() => setIsEditing(true)}>
          <h3 className={`font-semibold ${task.completed ? 'line-through text-muted' : ''}`}>
            {task.title}
          </h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
      )}
    </div>
  );
}
