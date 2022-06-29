<script setup>
import NoteForm from '@/components/NoteForm.vue';
import { useNotesStore } from '../stores/notes';

const { setNote } = useNotesStore();
const timeInMs = Date.now();
const isEdit = false;
const form = {
            id: timeInMs,
            title: '',
            description: '',
            category: 'personal',
            status: 'to-do',
            comment: ''
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
