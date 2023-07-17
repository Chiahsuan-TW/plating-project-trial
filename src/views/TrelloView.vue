<script>
export default {
  name: 'TrelloView'
};
</script>

<script setup>
import Kanban from '@/components/worksheet/Kanban.vue';
import API from '@/utils/API.js';
import { ref } from 'vue';

const rerenderKey = ref(0);
const taskList = ref([]);
const rerender = ref(true);

const { data } = await API.GET('/orders');
taskList.value = data;

/**
 * @param {object} evt - {key: number, scrollTo: number}
 */
async function cardModeReload(evt) {
  rerender.value = false;
  const { data } = await API.GET('/orders');
  taskList.value = data;

  // rerenderKey.value = evt.key;
  rerender.value = true;

  if (!('scrollTo' in evt)) return;
  autoScroll(evt.scrollTo);
}

function autoScroll(scrollTo) {
  const kanbanContainer = document.querySelector('.kanban-container');
  setTimeout(() => {
    kanbanContainer.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }, 600);
}
</script>

<template>
  <div class="overflow-auto kanban-container">
    <Kanban
      :taskList="taskList"
      @changeExecuteLocation="cardModeReload"
      @changeExecuteLocationFailed="cardModeReload"
      :key="rerenderKey"
      v-if="rerender"
    />
  </div>
</template>

<style></style>
