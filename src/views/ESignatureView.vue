<script>
export default {
  name: 'ESignature'
};
</script>

<script setup>
import { ref, onMounted } from 'vue';
import API from '@/utils/API.js';
import {
  SignatureButton,
  DisplaySignatureButton
} from '@/components/worksheet';
// import { VueSignaturePad } from 'vue-signature-pad';
// import b64toBlob from '@/utils/blob.js';

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

// jade
// const signaturePad = ref(null);
// const signatureNumber = ref(1);
// const signaturePic = ref('');

// const options = ref({
//   penColor: '#000'
// });

// function undo() {
//   signaturePad.value.undoSignature();
// }

// async function save() {
//   const { isEmpty, data } = signaturePad.value.saveSignature();
//   const signatureName = `signatureNumber${signatureNumber.value++}`;

//   if (!isEmpty) {
//     const blobData = b64toBlob(data);
//     try {
//       await API.UploadImg('signature', blobData, signatureName);

//       const {
//         data: { data: finalResponse }
//       } = await API.POST('/share/get-presignedURL', {
//         filename: signatureName
//       });

//       signaturePic.value = finalResponse.presignedURL;
//     } catch (error) {
//       console.log('error', error.message);
//     }
//   } else {
//     return;
//   }
// }

// function clear() {
//   signaturePad.value.clearSignature();
// }
</script>

<template>
  <ASpace>
    <SignatureButton label="施工技師簽名" @sign="getImageFromS3(filename)" />
    <DisplaySignatureButton
      label="技師已簽"
      :signaturePresignedUrl="signaturePresignedUrl"
    />
    <!-- <div class="mx-auto">
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
    </div> -->
  </ASpace>
</template>

<style scoped></style>
