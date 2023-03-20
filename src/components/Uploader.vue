<script setup>
import { ref, computed } from 'vue';
import API from '@/utils/API.js';
import { UploadOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  isWorksheetComplete: {
    type: Boolean,
    require: true
  },
  fileList: {
    type: Array,
    require: true,
    default: () => []
  },
  isUploaderDisable: {
    type: Boolean,
    require: true
  }
});

const fileList = ref(props.fileList);

// Eslint required
// const emit = defineEmits({
//     updateFileList: fileList => {
//       if (fileList.length >= 2) {
//         return true;
//       } else {
//         return false;
//       }
//     }
// });

const emit = defineEmits(['updateFileList']);

// disable after worksheet was checked.
const isDisable = computed(() => {
  if (props.isWorksheetComplete) {
    return true;
  } else {
    return false;
  }
});

// disable after photo at least 6.
const isButtonDisable = computed(() => {
  if (props.isUploaderDisable) {
    return true;
  } else {
    return false;
  }
});

// trashcan button css control
const trashcanDisplay = computed(() => {
  if (isDisable.value) {
    return 'none';
  } else {
    return 'block';
  }
});

function emitFileList() {
  emit('updateFileList', fileList.value);
}

/**
 * handleChange 將圖片上傳 S3
 * @param info:object: {
 *    file: object: {
 *      lastModified: number,
 *      name: string,
 *      size: number,
 *      type: string,
 *      uid: string,
 *      webkitRelativePath: string
      },
     fileList: object[]
  }
 * @returns: void
 */

const handleChange = async info => {
  /**
   * finalResponse: object: { filename: string, presignedURL: string }
   */

  try {
    //   await API.UploadImg('photo', info.file);

    //   const {
    //     data: { data: finalResponse }
    //   } = await API.POST('/share/get-presignedURL', { filename });

    //   // put presigned-url add to fileList
    //   // add backend return file name.
    //   fileList.value.forEach((eachFile, index, array) => {
    //     if (eachFile.name === filename) {
    //       array[index].filename = finalResponse.filename;
    //     }
    //   });

    emitFileList('updateFileList');
  } catch (error) {
    console.log('error', error.message);
  }

  // 練習
  /**
   *  getUploadUrlAndPhotoUrl: {
   *      'upload_url': string;
   *      'get_url': string;
   *  }
   */
  // const { data: getUploadUrlAndPhotoUrl } = await axios.post(
  //   'https://grndbc9554.execute-api.us-east-1.amazonaws.com/dev/jade-upload-s3',
  //   {
  //     fileName: filename,
  //     fileType: 'image/jpeg'
  //   }
  // );

  // await axios.put(getUploadUrlAndPhotoUrl['upload_url'], file);

  // fileImgUrl.value = getUploadUrlAndPhotoUrl['get_url'];
};

// avoid show upload progress
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    alert('You can only upload JPG file!');
  }
  return false;
}
</script>

<template>
  <div>
    <AUpload
      v-model:file-list="fileList"
      class="upload-list-inline"
      name="file"
      listType="picture"
      capture
      :beforeUpload="beforeUpload"
      @change="handleChange"
      :disabled="isDisable"
    >
      <AButton :disabled="isDisable || isButtonDisable">
        <UploadOutlined></UploadOutlined>
        Click to upload
      </AButton>
    </AUpload>
  </div>
</template>

<style scoped lang="scss">
:deep
  button.ant-btn.ant-btn-text.ant-btn-sm.ant-upload-list-item-card-actions-btn.ant-btn-icon-only {
  display: v-bind(trashcanDisplay);
}
</style>
