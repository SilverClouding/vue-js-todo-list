<script setup>
import { storeToRefs } from 'pinia';
import { useNotesStore } from '../stores/notes';

const { categories, statuses } = storeToRefs(useNotesStore());
defineProps({
  isEdit: Boolean,
  id: Number,
  title: String,
  description: String,
  category: String,
  status: String,
  comment: String,
  onSubmit: Function
});
</script>
<template>
<div class="note-form mt-12">
    <div class="field">
        <label class="label">Title</label>
        <div class="control">
            <input type="text" class="px-6 py-2 my-3 border w-full focus:outline-none" placeholder="Enter note title" :value="title" @input="$emit('update:title', $event.target.value)"/>
        </div>
    </div>
    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea rows="5" class="textarea px-6 py-2 my-3 border w-full focus:outline-none" placeholder="Enter note description" :value="description" @input="$emit('update:description', $event.target.value)"></textarea>
        </div>
    </div>
    <div class="field">
        <label class="label">Category</label>
        <div class="control">
             <div class="select">
                <select :value="category" class="px-6 py-2 my-3 border w-full focus:outline-none" @input="$emit('update:category', $event.target.value)">
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
                <select :value="status" class="px-6 py-2 my-3 border w-full focus:outline-none" @input="$emit('update:status', $event.target.value)">
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
            <textarea rows="3" class="textarea px-6 py-2 my-3 border w-full focus:outline-none" placeholder="Any additional comment..." :value="comment" @input="$emit('update:comment', $event.target.value)"></textarea>
        </div>
    </div>
    <button class="px-6 py-2 my-1 bg-blue-500 text-blue-100 border w-full" @click="onSubmit">Submit</button>
</div>
</template>