import { createRouter, createWebHistory } from 'vue-router'
import ToDoList from '@/views/ToDoListView.vue'
import CreateNote from '@/views/CreateNoteView.vue'
import EditNote from '@/views/EditNoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ToDoList
    },
    {
      path: '/create-note',
      name: 'create-note',
      component: CreateNote
    },
    {
      path: '/edit-note/:id',
      name: 'edit-note',
      component: EditNote
    },
    {
      path: '/:catchAll(.*)*',
      name: "PageNotFound",
      redirect: to => {
        return { path: '/' }
      }
    },
  ]
})

export default router
