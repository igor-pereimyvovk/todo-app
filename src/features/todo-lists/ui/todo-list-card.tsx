'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import { deleteList } from '@/features/todo-lists/api/deleteList';
import { updateList } from '@/features/todo-lists/api/updateList';
import Link from 'next/link';

type TodoListCardProps = {
  id: string;
  title: string;
  role: 'admin' | 'viewer';
  onAction: () => void;
};

export function TodoListCard({ id, title, onAction, role }: TodoListCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleDelete = async () => {
    try {
      await deleteList(id);
      onAction();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!newTitle.trim()) return;
    try {
      await updateList(id, newTitle.trim());
      onAction();
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(title);
  };

  return (
    <div className="rounded-2xl border p-4 shadow-sm space-y-2">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex gap-2 items-center">
            {role === 'admin' && (
              <>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
            <Link href={`/${id}`}>View</Link>
          </div>
        </div>
      )}
    </div>
  );
}
