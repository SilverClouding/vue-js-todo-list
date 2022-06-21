<script setup>
import { storeToRefs } from 'pinia';
import { useNotesStore } from '../stores/notes';

const { categories, statuses } = storeToRefs(useNotesStore());
const { setNote } = useNotesStore();
const props = defineProps({
  isEdit: Boolean,
  id: Number,
  title: String,
  description: String,
  category: String,
  status: String,
  comment: String
});
</script>
<template>
<div class="note-form mt-12">
    <div class="field">
        <label class="label">Title</label>
        <div class="control">
            <input type="text" class="px-6 py-2 my-3 border w-full focus:outline-none" placeholder="Enter note title" v-model="title" />
        </div>
    </div>
    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea rows="5" class="textarea px-6 py-2 my-3 border w-full focus:outline-none" placeholder="Enter note description" v-model="description"></textarea>
        </div>
    </div>
    <div class="field">
        <label class="label">Category</label>
        <div class="control">
             <div class="select">
                <select v-model="category" class="px-6 py-2 my-3 border w-full focus:outline-none">
                    <option v-for="option in categories" v-bind:value="option.value">
                    {{ option.label }}
                    </option>
                </select>
             </div>
        </div>
    </div>
    <div class="field" v-if="isEdit">
        <label class="label">Status</label>
        <div class="control">
             <div class="select">
                <select v-model="status" class="px-6 py-2 my-3 border w-full focus:outline-none">
                    <option v-for="option in statuses" v-bind:value="option.value">
                    {{ option.label }}
                    </option>
                </select>
             </div>
        </div>
    </div>
    <div class="field">
        <label class="label">Additional Comment</label>
        <div class="control">
            <textarea rows="3" class="textarea px-6 py-2 my-3 border w-full focus:outline-none" placeholder="Any additional comment..." v-model="comment"></textarea>
        </div>
    </div>
    <button class="px-6 py-2 my-1 bg-blue-500 text-blue-100 border w-full" @click="setNote({ id: id, title: title, description: description, category: category, status: status, comment: comment }, isEdit)">Submit</button>
</div>
</template>