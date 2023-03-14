<script setup>
import { ref } from 'vue';
import { VueSignaturePad } from 'vue-signature-pad';
import API from '@/utils/API.js';
import b64toBlob from '@/utils/blob.js';

const signaturePad = ref(null);
const signatureNumber = ref(1);
const signaturePic = ref('');

const options = ref({
  penColor: '#000'
});

function undo() {
  signaturePad.value.undoSignature();
}

async function save() {
  const { isEmpty, data } = signaturePad.value.saveSignature();
  const signatureName = `signatureNumber${signatureNumber.value++}`;

  if (!isEmpty) {
    const blobData = b64toBlob(data);
    try {
      await API.UploadImg('signature', blobData, signatureName);

      const {
        data: { data: finalResponse }
      } = await API.POST('/share/get-presignedURL', {
        filename: signatureName
      });

      signaturePic.value = finalResponse.presignedURL;
    } catch (error) {
      console.log('error', error.message);
    }
  } else {
    return;
  }
}

function clear() {
  signaturePad.value.clearSignature();
}
</script>

<template>
  <div class="about">
    <h1>This is an ESignature page</h1>
    <div class="mx-auto">
      <VueSignaturePad
        ref="signaturePad"
        class="border-solid border-2 rounded-md border-indigo-600"
        width="100%"
        height="500px"
        scaleToDevicePixelRatio
        :options="options"
      />
      <div class="flex mt-2 gap-x-1 justify-center">
        <AButton type="primary" @click="save">Save</AButton>
        <AButton @click="undo">Undo</AButton>
        <AButton type="danger" @click="clear">Clear</AButton>
      </div>
    </div>
    <div>
      <img class="w-100" :src="signaturePic" />
    </div>
  </div>
</template>

<style scoped></style>
