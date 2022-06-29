<!-- <script>
export default {
  data() {
    return {
      search: '',
      filteredNotes: this.notes,
      modalContent: {},
      modalOpen: false
    };
  },
  methods: {
    /**
     * Toggle status dropdown
     */
    toggleStatusDropdown(event){
      if(event.currentTarget.classList.contains('current-status')){
        event.currentTarget.parentNode.querySelector('.status-dropdown').classList.toggle('hidden');
      } else {
        document.querySelectorAll('.status-dropdown') && [...document.querySelectorAll('.status-dropdown')].forEach(elem => { 
          if(elem.parentNode.querySelector('.current-status') != event.target) elem.classList.add('hidden');
        });
      }
    },
    /** 
     * Show view modal
     */
    showViewModal(note){
      let categorylabel = this.categories.find(category => category.value === note.category);
      let currentStatus = this.statuses.find(status => status.value === note.status);
      this.modalContent = {
        title: note.title,
        description: note.description,
        category: categorylabel.label,
        status: currentStatus.label,
        comment: note.comment
      };
      this.modalOpen = true;
    },
    /** 
     * Close view modal
     */
    closeViewModal(){
      this.modalContent = {};
      this.modalOpen = false;
    },
    /**
     * Search notes
     */
    searchNotes(){
      if(!this.search.trim()?.length){
        this.filteredNotes = this.notes;
      } else {
        this.filteredNotes = this.notes.filter(note => note.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      }
    },
    /**
     * Get status label by value
     */
    getStatusLabelByValue(str) {
      //console.log(this.statuses);
      let currentStatus = this.statuses.find(status => status.value === str);
      return currentStatus.label;
    },
    /**
     * Change status of note by index
     */
    updateStatus(index) {
      const statusValues = this.statuses.map(status => status.value);
      let newIndex = statusValues.indexOf(this.notes[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.setNoteStatus(index, statusValues[newIndex]);
    },
  },
};
</script> -->
<script setup>
import { ref } from "vue";
import { RouterLink } from 'vue-router'
import { useNotesStore } from '../stores/notes';

import IconView from '@/components/icons/IconView.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconSearch from '@/components/icons/IconSearch.vue';

import Modal from '@/components/Modal.vue';
 
const { statuses, notes, categories, setNoteStatus, deleteNote } = useNotesStore();

let search = ref("");
let filteredNotes = notes;
let modalContent = {};
let modalOpen = false;

/**
 * Toggle status dropdown
 */
const toggleStatusDropdown = (event) => {
  if(event.currentTarget.classList.contains('current-status')){
    event.currentTarget.parentNode.querySelector('.status-dropdown').classList.toggle('hidden');
  } else {
    document.querySelectorAll('.status-dropdown') && [...document.querySelectorAll('.status-dropdown')].forEach(elem => { 
      if(elem.parentNode.querySelector('.current-status') != event.target) elem.classList.add('hidden');
    });
  }
};
/** 
 * Show view modal
 */
const showViewModal = (note) => {
  let categorylabel = categories.find(category => category.value === note.category);
  let currentStatus = statuses.find(status => status.value === note.status);
  modalContent = {
    title: note.title,
    description: note.description,
    category: categorylabel.label,
    status: currentStatus.label,
    comment: note.comment
  };
  console.log(modalContent);
  modalOpen = true;
};
/** 
 * Close view modal
 */
const closeViewModal = () => {
  modalContent = {};
  modalOpen = false;
};
/**
 * Search notes
 */
const searchNotes = () => {
  if(!search.value.trim().length){
    filteredNotes = notes;
  } else {
    filteredNotes = notes.filter(note => note.title.toLowerCase().indexOf(search.value.toLowerCase()) > -1);
  }
  return filteredNotes;
};
/**
 * Get status label by value
 */
const getStatusLabelByValue = (str) => {
  let currentStatus = statuses.find(status => status.value === str);
  return currentStatus.label;
};
/**
 * Change status of note by index
 */
const updateStatus = (index) => {
  const statusValues = statuses.map(status => status.value);
  let newIndex = statusValues.indexOf(this.notes[index].status);
  if (++newIndex > 2) newIndex = 0;
  this.setNoteStatus(index, statusValues[newIndex]);
};

</script>
<template>
  <div @click="toggleStatusDropdown">
    <div class="search-note-wrapper px-6 py-2 my-5 border w-full">
      <div class="relative">
        <input type="text" class="w-full focus:outline-none" placeholder="Search note..." v-model="search"/>
        <span class="absolute top-1/2 -translate-y-1/2 -right-2">
          <IconSearch></IconSearch>
        </span>
      </div>
    </div>
     <div class="table bg-white my-5 w-full">
      <div class="table--head bg-blue-500 text-blue-100">
        <div class="hidden md:flex md:flex-row table--row">
          <div class="text-left px-4 py-2 w-full md:w-3/5">Title</div>
          <div class="text-center px-4 py-2 w-full md:w-1/5" style="min-width: 120px">Status</div>
          <div class="text-center px-4 py-2 w-full md:w-1/5">Actions</div>
        </div>
      </div>
      <div class="table--body" v-if="searchNotes()?.length > 0">
        <div v-for="(note, index) in searchNotes()" :key="index" class="flex flex-col md:flex-row table--row odd:bg-blue-100 even:bg-blue-50 transition duration-300">
          <div class="text-left px-4 py-2 text-blue-800 w-full md:w-3/5">
            <span :class="{ 'line-through': note.status === 'done' }">
              {{ note.title }}
            </span>
          </div>
          <div class="text-left md:text-center px-4 py-2 text-blue-800 w-full md:w-1/5">
            <div class="relative">
              <span
                class="current-status cursor-pointer"
                @click="toggleStatusDropdown"
              >
                <strong class="md:hidden">Status: </strong>{{ getStatusLabelByValue(note.status) }}
              </span>
              <div class="status-dropdown cursor-pointer w-24 absolute top-6 left-1/2 -translate-x-1/2 border bg-white z-50 hidden">
                <div v-for="(s, sIndex) in statuses.filter(st => st.value != note.status)" :key="sIndex" @click="setNoteStatus(index, s.value)">
                  {{ s.label }}
                </div>
              </div>
            </div>
          </div>
          <div class="text-left md:text-center px-4 py-2 text-blue-800 flex flex-row gap-2 md:justify-center w-full md:w-1/5">
            <div @click="showViewModal(note)">
              <IconView></IconView>           
            </div>
            <div>
              <RouterLink :to="{ name: 'edit-note', params: { id: note.id } }">
                <IconEdit></IconEdit>
              </RouterLink>             
            </div>
            <div @click="deleteNote(index)">
               <IconDelete></IconDelete>
            </div>
          </div>
        </div>
      </div>
      <div class="table--body" v-else>
        <div class="flex justify-center items-center h-16 table--row odd:bg-blue-100 transition duration-300">
          <div>No notes found...</div>
        </div>
      </div>
    </div>
  </div>
  <Modal 
    :modalOpen="modalOpen"
    :modalContent="modalContent"
    :closeViewModal="closeViewModal"
  ></Modal>
</template>

<style scoped>
</style>

