<script setup>
import { useRoute } from 'vue-router'
import { useNotesStore } from '../stores/notes';

import NoteForm from '@/components/NoteForm.vue';
const route = useRoute();
const { getNoteById, setNote } = useNotesStore();
const note = getNoteById(route.params.id);
const isEdit = true;
const form = {
            id: note.id,
            title: note.title,
            description: note.description,
            category: note.category,
            status: note.status,
            comment: note.comment
        };
const formSubmit = () => {
  //console.log(form);
  setNote({ id: form.id, title: form.title, description: form.description, category: form.category, status: form.status, comment: form.comment }, isEdit);
}
</script>
<template>
  <div>
    <NoteForm
      :isEdit="isEdit"
      :id="form.id"
      :onSubmit="formSubmit"
      v-model:title="form.title"
      v-model:description="form.description"
      v-model:category="form.category"
      v-model:status="form.status"
      v-model:comment="form.comment"
    ></NoteForm>
  </div>
</template>

<style scoped>
</style>