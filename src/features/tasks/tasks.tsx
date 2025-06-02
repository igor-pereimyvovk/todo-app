'use client';

import { getTasks, Task } from '@/features/tasks/api/getTasks';
import { useEffect, useState } from 'react';
import { addTask } from '@/features/tasks/api/addTask';
import { Input } from '@/shared/ui/kit/input';
import { Textarea } from '@/shared/ui/kit/textarea';
import { Button } from '@/shared/ui/kit/button';
import { TaskCard } from '@/features/tasks/ui/task-card';
import { AddCollaboratorForm } from '@/features/tasks/ui/add-collaborator-form';
import { useAuth } from '@/app/auth-context';

type TasksPageProps = {
  listId: string;
};

export function TasksPage({ listId }: TasksPageProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const loadTasks = async () => {
    const data = await getTasks(listId);
    setTasks(data);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask(listId, title.trim(), description.trim());
    setTitle('');
    setDescription('');
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, [user]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Tasks</h1>

      <div className="space-y-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <Button onClick={handleAdd}>Add Task</Button>
      </div>
      <AddCollaboratorForm listId={listId} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onAction={loadTasks} />
        ))}
      </div>
    </main>
  );
}
