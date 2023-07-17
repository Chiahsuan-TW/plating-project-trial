<script setup>
import { ref } from 'vue';
const value1 = ref([]);
const options = ref([
  {
    id: 0,
    label: '車體快速鍍膜套組A',
    value: '車體快速鍍膜套組A'
  },
  {
    id: 1,
    label: '車體快速鍍膜套組B',
    value: '車體快速鍍膜套組B'
  }
]);

const handleChange = value => {
  console.log(`selected ${value}`);
};
</script>

<template>
  <ASelect
    ref="select"
    v-model:value="value1"
    style="width: 100%"
    mode="tags"
    :maxTagCount="1"
    placeholder="請選擇施工服務項目"
    :options="options"
    @change="handleChange"
  ></ASelect>
</template>

<style scoped lang="scss"></style>
