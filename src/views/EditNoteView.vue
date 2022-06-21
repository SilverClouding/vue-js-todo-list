<script setup>
import { useRoute } from 'vue-router'
import { useNotesStore } from '../stores/notes';

import NoteForm from '@/components/NoteForm.vue';
const route = useRoute();
const store = useNotesStore();
const getNoteById = store.getNoteById;
const note = getNoteById(route.params.id);

</script>
<template>
  <div>
    <NoteForm
      :isEdit="true"
      :id="note.id"
      :title="note.title"
      :description="note.description"
      :category="note.category"
      :status="note.status"
      :comment="note.comment"
    ></NoteForm>
  </div>
</template>

<style scoped>
</style>