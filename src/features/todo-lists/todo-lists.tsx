'use client';

import { CreateListForm } from '@/features/todo-lists/ui/create-list-form';
import { TodoListCard } from '@/features/todo-lists/ui/todo-list-card';
import { startTransition, useEffect, useState } from 'react';
import { getLists, TodoList } from '@/features/todo-lists/api/getLists';
import { useAuth } from '@/app/auth-context';

export default function TodoListsPage() {
  const { user } = useAuth();
  const [lists, setLists] = useState<TodoList[]>([]);

  const loadLists = () => {
    startTransition(async () => {
      try {
        const data = await getLists();
        setLists(data);
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    loadLists();
  }, [user]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Your To-Do Lists</h1>

      <CreateListForm onCreate={loadLists} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lists.map((list) => (
          <TodoListCard
            key={list.id}
            role={list.role}
            title={list.title}
            id={list.id}
            onAction={loadLists}
          />
        ))}
      </div>
    </main>
  );
}
