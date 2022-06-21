<script setup>
import NoteForm from '@/components/NoteForm.vue';
</script>
<template>
  <div>
    <NoteForm
      :isEdit="isEdit"
      :id="form.id"
      :title="form.title"
      :description="form.description"
      :category="form.category"
      :status="form.status"
      :comment="form.comment"
    ></NoteForm>
  </div>
</template>

<style scoped>
</style>
<script>
export default {
    components: {
      NoteForm
    },
    data(){
      const timeInMs = Date.now();
      return  {
        isEdit: false,
        form : {
            id: timeInMs,
            title: '',
            description: '',
            category: 'personal',
            status: 'to-do',
            comment: ''
        }
      }
    }
}
</script>
