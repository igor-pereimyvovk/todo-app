'use client';

import { startTransition, useState } from 'react';
import { Input } from '@/shared/ui/kit/input';
import { Button } from '@/shared/ui/kit/button';
import { addList } from '@/features/todo-lists/api/addList';

type CreateListFormProps = {
  onCreate: () => void;
};

export function CreateListForm({ onCreate }: CreateListFormProps) {
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;
    startTransition(async () => {
      try {
        await addList(title);
        setTitle('');
        onCreate();
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
      className="flex gap-2"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New list title"
      />
      <Button type="submit">Add list</Button>
    </form>
  );
}
