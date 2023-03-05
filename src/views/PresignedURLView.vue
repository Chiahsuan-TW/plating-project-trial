<script>
export default {
  name: 'PresignedURLView'
};
</script>

<script setup>
import { reactive } from 'vue';
import API from '@/utils/API.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Cookies from 'js-cookie';

dayjs.extend(duration);

const formState = reactive({
  email: '',
  password: ''
});
const onFinish = async values => {
  const {
    data: { access_token, token_expired }
  } = await API.POST('user/signin', {
    ...values,
    provider: 'native'
  });
  const daysToExpire = dayjs.duration(token_expired, 'seconds').asDays();
  Cookies.set('PlatingToken', access_token, { expires: daysToExpire });
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <section class="w-1/2 mx-auto">
    <AForm
      :model="formState"
      name="basic"
      :labelCol="{ span: 8 }"
      :wrapperCol="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <AFormItem
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <AInput v-model:value="formState.email" />
      </AFormItem>

      <AFormItem
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <AInputPassword v-model:value="formState.password" />
      </AFormItem>

      <AFormItem :wrapperCol="{ offset: 8, span: 16 }">
        <AButton type="primary" htmlType="submit">Submit</AButton>
      </AFormItem>
    </AForm>
  </section>
</template>

<style></style>
