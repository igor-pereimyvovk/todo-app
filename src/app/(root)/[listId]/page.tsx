import { TasksPage } from '@/features/tasks/tasks';

interface Props {
  params: Promise<{
    listId: string;
  }>;
}

export default async function List({ params }: Props) {
  const { listId } = await params;
  return <TasksPage listId={listId} />;
}
