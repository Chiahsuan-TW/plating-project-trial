<script setup>
import { ref, onMounted } from 'vue';
import Draggable from 'vuedraggable';

let localList = ref([]);
const controlOnStart = ref(true);

// mounted get localStorage
onMounted(() => {
  localList.value = localStorage.getItem('list1');
  // console.log('localList.value ', localList.value);

  // list1.value = [...JSON.parse(localList.value)];
});

const list1 = ref([
  {
    id: 0,
    name: '中台中',
    workCard: [
      { id: 0, name: '中台中 鍍膜1' },
      { id: 1, name: '中台中 鍍膜2' },
      { id: 2, name: '中台中 鍍膜3' }
    ]
  },
  {
    id: 1,
    name: '東海所',
    workCard: [
      { id: 0, name: '東海所 鍍膜1' },
      { id: 1, name: '東海所 鍍膜2' }
    ]
  },
  {
    id: 2,
    name: '沙鹿所',
    workCard: [
      { id: 0, name: '沙鹿所 鍍膜1' },
      { id: 1, name: '沙鹿所 鍍膜2' }
    ]
  },
  {
    id: 3,
    name: '太平所',
    workCard: [{ id: 0, name: '太平所 鍍膜1' }]
  },
  {
    id: 4,
    name: '深坑所',
    workCard: [
      { id: 0, name: '深坑所 鍍膜1' },
      { id: 1, name: '深坑所 鍍膜2' }
    ]
  },
  {
    id: 5,
    name: '新北所',
    workCard: [
      { id: 0, name: '新北所 鍍膜1' },
      { id: 1, name: '新北所 鍍膜2' }
    ]
  },
  {
    id: 6,
    name: '景美所',
    workCard: [
      { id: 0, name: '景美所 鍍膜1' },
      { id: 1, name: '景美所 鍍膜2' }
    ]
  },
  {
    id: 7,
    name: '新店所',
    workCard: [
      { id: 0, name: '新店所 鍍膜1' },
      { id: 1, name: '新店所 鍍膜2' }
    ]
  },
  {
    id: 8,
    name: '北安所',
    workCard: [
      { id: 0, name: '北安所 鍍膜1' },
      { id: 1, name: '北安所 鍍膜2' }
    ]
  },
  {
    id: 9,
    name: '小碧潭所',
    workCard: [
      { id: 0, name: '小碧潭所 鍍膜1' },
      { id: 1, name: '小碧潭所 鍍膜2' }
    ]
  },
  {
    id: 10,
    name: '信義所',
    workCard: [
      { id: 0, name: '信義所 鍍膜1' },
      { id: 1, name: '信義所 鍍膜2' }
    ]
  },
  {
    id: 11,
    name: '大直所',
    workCard: [
      { id: 0, name: '大直所 鍍膜1' },
      { id: 1, name: '大直所 鍍膜2' }
    ]
  }
]);

function clone({ name, id }) {
  return { name, id };
}

function pullFunction() {
  return controlOnStart.value ? 'clone' : true;
}

function start({ originalEvent }) {
  controlOnStart.value = originalEvent.ctrlKey;
}

function saveLocal() {
  localStorage.setItem('list1', JSON.stringify(list1.value));
  localList.value = localStorage.getItem('list1');
  list1.value = [...JSON.parse(localList.value)];
}

function putAPI() {
  console.log('put api');
}

function test() {
  console.log('test');
}
</script>

<template>
  <div class="about overflow-x-scroll">
    <h1>This is an Trello page</h1>
    <Draggable
      class="flex flex-row"
      ghostClass="ghost-column"
      v-model="list1"
      itemKey="id"
      @end="saveLocal"
      :scrollSensitivity="10"
      :forceFallback="true"
    >
      <template #item="{ element }">
        <div class="p-2 m-2">
          <div class="p-2 text-center bg-emerald-200 w-fit cursor-pointer">
            {{ element.name }}
          </div>
          <Draggable
            v-model="element.workCard"
            itemKey="id"
            :clone="clone"
            :group="{ name: 'people', pull: pullFunction }"
            @start="start"
            @end="putAPI"
            @change="test"
            :scrollSensitivity="10"
            :forceFallback="true"
            :sort="false"
            ghostClass="ghost"
          >
            <template #item="{ element }">
              <p class="p-2 my-2 cursor-pointer bg-sky-100">
                {{ element.name }}
              </p>
            </template>
          </Draggable>
        </div>
      </template>
    </Draggable>
  </div>
</template>

<style scoped>
.ghost {
  border: 1px dashed black;
  background-color: gray;
}

.ghost-column {
  border: 1px dashed black;
  background-color: gray;
  height: fit-content;
}
</style>
