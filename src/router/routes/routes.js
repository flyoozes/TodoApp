import NoteView from '@/views/NoteView';
import NoteEdit from '@/views/NoteEdit';

export const routes = [
  {
    path: '/',
    redirect: { name: 'notes' },
  },
  {
    path: '/notes',
    name: 'notes',
    component: NoteView,
  },
  {
    path: '/note/:id',
    name: 'note',
    component: NoteEdit,
  },
];
