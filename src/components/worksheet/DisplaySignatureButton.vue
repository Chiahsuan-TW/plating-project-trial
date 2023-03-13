<script>
export default {
  name: 'DisplaySignatureButton'
};
</script>

<script setup>
import { ref } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';

defineProps({
  signaturePresignedUrl: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  }
});

const isSignaturePadShown = ref(false);
</script>

<template>
  <AButton
    class="w-96 !flex items-center justify-center"
    type="default"
    @click="isSignaturePadShown = true"
  >
    <template #icon>
      <CheckOutlined />
    </template>
    {{ label }}</AButton
  >

  <ADrawer
    :width="500"
    placement="bottom"
    :visible="isSignaturePadShown"
    @close="isSignaturePadShown = false"
  >
    <img
      v-if="signaturePresignedUrl"
      :src="signaturePresignedUrl"
      alt="signature"
    />
  </ADrawer>
</template>
