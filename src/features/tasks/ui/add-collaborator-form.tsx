'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import { addCollaborator } from '@/features/tasks/api/addCollaborator';

export function AddCollaboratorForm({ listId }: { listId: string }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'viewer'>('viewer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addCollaborator(listId, email, role);
      setEmail('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'viewer')}>
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>
      <Button type="submit">Add</Button>
    </form>
  );
}
