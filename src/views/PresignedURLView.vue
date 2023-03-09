<script>
export default {
  name: 'PresignedURLView'
};
</script>

<script setup>
import { reactive, ref } from 'vue';
import API from '@/utils/API.js';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Cookies from 'js-cookie';
import { Form } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';

dayjs.extend(duration);

const formState = reactive({
  email: 'webcamp@gmail.com',
  password: 'webcamp12345678'
});
const rulesRef = reactive({
  email: [
    {
      required: true,
      message: 'Please input your username!'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input your password!'
    }
  ]
});

const useForm = Form.useForm;
const { resetFields, validate, validateInfos } = useForm(formState, rulesRef, {
  // onValidate: (...args) => console.log(...args)
});

const onFinish = () => {
  validate()
    .then(async () => {
      const {
        data: { access_token, token_expired }
      } = await API.POST('user/signin', {
        ...formState,
        provider: 'native'
      });

      const daysToExpire = dayjs.duration(token_expired, 'seconds').asDays();

      Cookies.set('PlatingToken', access_token, { expires: daysToExpire });

      resetFields();
    })
    .catch(err => {
      console.log('Failed:', err.message);
    });
};

const fileList = ref([]);
let fileName = ref('');
let fileImgUrl = ref('');

/**
 * handleChange 將圖片上傳 S3
 * @param info:object
 * @returns: void
 */

const handleChange = async info => {
  const filename = info.file.name;

  await API.UploadImg(info.file);

  const {
    data: { data: res }
  } = await API.POST('/share/get-presignedURL', { filename });

  console.log('res', res);

  // 把 presigned-url 網址加入 fileList
  fileList.value.forEach((eachFile, index, array) => {
    if (eachFile.name === filename) {
      array[index].imageUrl = res.presignedURL;
    }
  });

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

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  return false;
}
</script>

<template>
  <section class="w-1/2 mx-auto">
    <AForm
      :model="formState"
      name="basic"
      :labelCol="{ span: 8 }"
      :wrapperCol="{ span: 16 }"
      autocomplete="off"
    >
      <AFormItem label="Email" v-bind="validateInfos.email">
        <AInput v-model:value="formState.email" />
      </AFormItem>

      <AFormItem label="Password" v-bind="validateInfos.password">
        <AInputPassword v-model:value="formState.password" />
      </AFormItem>

      <AFormItem :wrapperCol="{ offset: 8, span: 16 }">
        <AButton type="primary" htmlType="submit" @click.prevent="onFinish"
          >Submit</AButton
        >
      </AFormItem>
    </AForm>
  </section>
  <section class="w-1/2 mx-auto">
    <a-upload
      v-model:file-list="fileList"
      name="file"
      :beforeUpload="beforeUpload"
      @change="handleChange"
      capture
    >
      <a-button>
        <upload-outlined></upload-outlined>
        take picture
      </a-button>
    </a-upload>
    <div class="mx-auto flex flex-row">
      <template v-for="item in fileList">
        <div>
          <img class="w-100" :src="item.imageUrl" />
        </div>
      </template>
    </div>
  </section>
</template>

<style></style>
