<script>
export default {
  name: 'Kanban'
};
</script>

<script setup>
import { ref, onMounted } from 'vue';
import Draggable from 'vuedraggable';
import Card from '@/components/worksheet/Card.vue';
import { LOCATIONS } from '@/const/locations.js';
import { message } from 'ant-design-vue';
import API from '@/utils/API.js';

const props = defineProps({
  taskList: {
    type: Array,
    required: true
  }
});

const isLoading = ref(true);
const locationOrder = ref({});
const worksheetList = ref([]);
onMounted(async () => {
  if (locationOrder.value === null) {
    memorizeLocationOrder(LOCATIONS);
  }
  locationOrder.value = JSON.parse(localStorage.getItem('locationOrder'));

  worksheetList.value = groupWorksheetByArea(props.taskList, LOCATIONS);
  worksheetList.value = reorder(worksheetList.value, locationOrder.value);
  isLoading.value = false;
});

/**
 * Get locations's order and store it in local storage
 * @param {array} list
 */
function memorizeLocationOrder(list) {
  locationOrder.value = list.reduce((result, item, index) => {
    result[item.area] = index;
    return result;
  }, {});
  localStorage.setItem('locationOrder', JSON.stringify(locationOrder.value));
}

/**
 * @param {Object[]} list - worksheet list without grouping
 * @param {Object[]} locations - all locations
 * @returns {Array.<{area: string, worksheetList: Object[]}>} categorized worksheet acc. to its location
 */
function groupWorksheetByArea(list, locations) {
  const groupedList = list.reduce((result, item) => {
    const targetGroup =
      result.length > 0 && result.find(group => group.area === item.area);
    targetGroup
      ? targetGroup.worksheetList.push(item)
      : (result = [...result, { area: item.area, worksheetList: [item] }]);
    return result;
  }, []);

  return locations.map(location => {
    const target = groupedList.find(group => group.area === location.area);
    const worksheetList = target ? target.worksheetList : [];
    return { area: location.area, worksheetList };
  });
}

/**
 * @param {array} list - worksheetList
 * @param {object} locationOrder
 * @returns {array} worksheetList that has been reodered by the location order stored in local storage
 */
function reorder(list, locationOrder) {
  return list
    .map(item => ({ ...item, order: locationOrder[item.area] }))
    .sort(function (current, next) {
      return current.order - next.order;
    });
}

async function updateWorksheetLocation(evt) {
  const to = evt.to.dataset.location;
  const from = evt.from.dataset.location;
  if (to === from) return;

  const draggedItemId = evt.item.dataset.id;
  const { data: draggedItem } = await API.GET(`/orders/${draggedItemId}`);
  const updatedOrder = {
    ...draggedItem,
    area: to
  };
  try {
    await API.PUT(`/orders/${draggedItemId}`, updatedOrder);

    emit('changeExecuteLocation', {
      key: new Date().valueOf(),
      scrollTo: scrollTo.value
    });
    message.success('成功變更生產據點');
  } catch (error) {
    const {
      response: { data }
    } = error;
    message.error(data.message);
    emit('changeExecuteLocationFailed', new Date().valueOf());
  }
}

// vue draggable
function clone(item) {
  return item;
}

const controlOnStart = ref(true);
function pullFunction() {
  return controlOnStart.value ? 'clone' : true;
}

function start({ originalEvent }) {
  controlOnStart.value = originalEvent.ctrlKey;
  const kanbanContainer = document.querySelector('.kanban-container');
  scrollTo.value = kanbanContainer.scrollLeft;
}

const emit = defineEmits({
  changeExecuteLocation: () => true,
  changeExecuteLocationFailed: () => true
});

const scrollTo = ref(0);
function onMove() {
  const kanbanContainer = document.querySelector('.kanban-container');
  scrollTo.value = kanbanContainer.scrollLeft;
}
</script>

<template>
  <div>
    <Draggable
      class="flex flex-row"
      ghostClass="ghost-column"
      v-model="worksheetList"
      itemKey="area"
      @end="memorizeLocationOrder(worksheetList)"
      :scrollSensitivity="80"
      :forceFallback="true"
    >
      <template #item="{ element }">
        <div class="column h-fit">
          <div class="py-2 px-4 w-60 cursor-grab bg-cyan-500">
            <span>{{ element.area }}</span>
          </div>
          <Draggable
            :data-location="element.area"
            v-model="element.worksheetList"
            itemKey="id"
            :clone="clone"
            :group="{
              name: 'id',
              pull: pullFunction
            }"
            @start="start"
            @end="updateWorksheetLocation"
            @move="onMove"
            :scrollSensitivity="80"
            :forceFallback="true"
            :sort="false"
            :swapThreshold="1"
            ghostClass="ghost"
          >
            <template #item="{ element: data }">
              <Card :data="data" :data-id="data.id" />
            </template>
          </Draggable>
        </div>
      </template>
    </Draggable>
  </div>
</template>

<style scoped lang="scss">
.column + .column {
  @apply ml-2.5;
}

.ghost,
.ghost-column {
  @apply border-4 border-dashed border-gray-400;

  :deep(*) {
    @apply text-transparent bg-gray-300 border-0 fill-none;
  }
}
</style>
