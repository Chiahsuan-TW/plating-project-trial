<script>
export default {
  name: 'ESignature'
};
</script>

<script setup>
import {
  SignatureButton,
  DisplaySignatureButton
} from '@/components/worksheet';
import { onMounted, ref } from 'vue';
import API from '@/utils/API';

const signaturePresignedUrl = ref('');
const filename = 'uuid'; // should be provided from api data

onMounted(async () => {
  await getImageFromS3(filename);
});

async function getImageFromS3(filename) {
  const {
    data: { data: image }
  } = await API.POST('/share/get-presignedURL', { filename });
  signaturePresignedUrl.value = image.presignedURL;
}
</script>

<template>
  <ASpace>
    <SignatureButton label="施工技師簽名" @sign="getImageFromS3(filename)" />
    <DisplaySignatureButton
      label="技師已簽"
      :signaturePresignedUrl="signaturePresignedUrl"
    />
  </ASpace>
</template>
