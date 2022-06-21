<script setup>
const props = defineProps({
  modalOpen: Boolean,
  modalContent: Object,
  closeViewModal: Function
});

</script>
<template>
<div :tabindex="modalOpen ? null : -1" :aria-hidden="modalOpen ? false : true" class="content-modal overflow-y-auto overflow-x-hidden fixed inset-0 z-50 w-full h-modal justify-center items-center bg-blue-100" :class="{
                  'hidden': modalOpen !== true,
                }">
    <div class="absolute p-4 w-full max-w-2xl h-full md:h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {{ modalContent.title }}
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="closeViewModal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <div v-if="modalContent?.description?.length > 0">{{ modalContent.description }}</div>
                <div v-if="modalContent?.category?.length > 0"><strong>Category: </strong>{{ modalContent.category }}</div>
                <div v-if="modalContent?.status?.length > 0"><strong>Status: </strong>{{ modalContent.status }}</div>
                <div v-if="modalContent?.comment?.length > 0"><strong>Additional Comments: </strong><div>{{ modalContent.comment }}</div></div>
            </div>
        </div>
    </div>
</div>
</template>
