<script>
export default {
  name: 'SignatureButton'
};
</script>

<script setup>
import { VueSignaturePad } from 'vue-signature-pad';
import { ref } from 'vue';
import API from '@/utils/API';
import axios from 'axios';

defineProps({
  label: {
    type: String,
    required: true
  }
});

const emit = defineEmits({
  sign: () => true
});

const signaturePad = ref(null);
const isSignaturePadShown = ref(false);

// sign -> click save -> get dataURI -> convert it into file -> use uuid as filename and upload to S3?
// save uuid to DB? -> use the uuid to get signature image from s3 bucket?
async function save() {
  const { data: dataURI } = signaturePad.value.saveSignature();
  const file = await dataUrlToFile(dataURI, 'uuid');
  await uploadToS3(file, file.name);
}

async function uploadToS3(imageFile, filename) {
  // 1. get s3 presigned url
  const {
    data: { data }
  } = await API.POST('/share/upload-image-presignedURL', { filename });
  const { presignedURL } = data;

  // 2. put request to upload image to s3 bucket
  await axios.put(presignedURL, imageFile, {
    headers: {
      'Content-Type': 'image'
    }
  });
  emit('sign');
}

// ref: https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
async function dataUrlToFile(dataURI, fileName) {
  const res = await fetch(dataURI);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
}

function clear() {
  signaturePad.value.clearSignature();
}
</script>

<template>
  <AButton class="w-96" type="primary" @click="isSignaturePadShown = true">{{
    label
  }}</AButton>

  <ADrawer
    :width="500"
    placement="bottom"
    :visible="isSignaturePadShown"
    @close="isSignaturePadShown = false"
  >
    <template #extra>
      <AButton style="margin-right: 8px" @click="clear">清除</AButton>
      <AButton type="primary" @click="save">儲存</AButton>
    </template>
    <VueSignaturePad width="500px" height="500px" ref="signaturePad" />
  </ADrawer>
</template>
