<script>
export default {
  name: 'Card'
};
</script>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {}
  }
});
</script>

<template>
  <div>
    <div class="px-4 py-2.5 w-[15rem] min-h-[9.75rem] cursor-grab bg-teal-50">
      <div class="mb-2.5 flex">
        <p class="mb-0 text-base font-medium text-primary">
          {{ data.orderNumber }}
        </p>
      </div>
      <p class="mb-2.5 text-xs">車型：{{ data.model }}</p>
      <p class="mb-2.5 text-xs">交貨日： {{ data.deliveryDate }}</p>
    </div>
  </div>
</template>

<style></style>
