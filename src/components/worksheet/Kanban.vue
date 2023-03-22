<script>
export default {
  name: 'Kanban'
};
</script>

<script setup>
import Draggable from '@/vuedraggable';

const list1 = [
  { name: 'John', id: 1 },
  { name: 'Joao', id: 2 },
  { name: 'Jean', id: 3 },
  { name: 'Gerard', id: 4 }
];
const list2 = [
  { name: 'Juan', id: 5 },
  { name: 'Edgard', id: 6 },
  { name: 'Johnson', id: 7 }
];

// function add() {
//   this.list.push({ name: 'Juan' });
// }
// function replace() {
//   this.list = [{ name: 'Edgard' }];
// }
// function clone(el) {
//   return {
//     name: el.name + ' cloned'
//   };
// }
function log(evt) {
  window.console.log(evt);
}
</script>

<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <Draggable
        class="list-group"
        :list="list1"
        group="people"
        @change="log"
        itemKey="name"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">{{ element.name }} {{ index }}</div>
        </template>
      </Draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <Draggable
        class="list-group"
        :list="list2"
        group="people"
        @change="log"
        itemKey="name"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">{{ element.name }} {{ index }}</div>
        </template>
      </Draggable>
    </div>
  </div>
</template>
