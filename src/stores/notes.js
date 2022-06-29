import { defineStore } from 'pinia'
//import { useStorage } from '@vueuse/core'
import router from '@/router';

export const useNotesStore = defineStore({
  id: 'notesStore',
  state: () => ({
    notes: [
      {
        id: 1,
        title: "Test note 1",
        description: "",
        category: "personal",
        status: "to-do",
        comment: ""
      },
      {
        id: 2,
        title: "Demo note 2",
        description: "",
        category: "official",
        status: "in-progress",
        comment: ""
      },
      {
        id: 3,
        title: "Other note 3",
        description: "",
        category: "official",
        status: "in-progress",
        comment: ""
      },
    ],
    // notes: useStorage('notes', []),
    categories: [
      { value: 'personal', label: "Personal" },
      { value: 'official', label: "Official" }
    ],
    statuses: [
        { value: 'to-do', label: "To-do" },
        { value: 'in-progress', label: "In progress" },
        { value: 'done', label: "Done" }
    ]
  }),
  getters: {
    getNoteById: (state) => (id) => {
        return state.notes.find(note => note.id === parseInt(id))
    }
  },
  actions: {
    async setNote(note, isEdit) {
      if(isEdit) {
        const noteIndex = this.notes.findIndex(noteItem => noteItem.id === note.id);
        this.notes[noteIndex] = note;
        if(note.status === 'done') this.deleteNote(noteIndex);
      } else {
        if(note.status !== 'done') this.notes.push(note);
      }
      router.push({ name: 'home' });
    },
    async setNoteStatus(index, status){
       this.notes[index].status = status;
       if(status === 'done') this.deleteNote(index);
    },
    async deleteNote(index){
       this.notes.splice(index, 1);
    }
  }
})
