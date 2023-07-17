<script setup>
import { reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
const useForm = Form.useForm;

const formState = reactive({
  name: '',
  region: ''
});

const rulesRef = reactive({
  name: [
    {
      required: true,
      message: '請輸入姓名'
    }
  ],
  region: [
    {
      required: true,
      message: '請輸入區域'
    }
  ]
});

const labelCol = {
  span: 10
};
const wrapperCol = {
  span: 20
};

const { resetFields, validate, validateInfos } = useForm(formState, rulesRef, {
  onValidate: (...args) => console.log(...args)
});

const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(formState));
      resetFields();
    })
    .catch(err => {
      console.log('error', err);
    });
};
</script>

<template>
  <div class="mx-auto w-1/2">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="姓名" v-bind="validateInfos.name">
        <a-input v-model:value="formState.name" placeholder="請輸入姓名" />
      </a-form-item>
      <a-form-item label="區域名稱" v-bind="validateInfos.region">
        <a-input v-model:value="formState.region" placeholder="請輸入區域" />
      </a-form-item>
      <div class="flex justify-center pt-1">
        <a-button
          @click.prevent="onSubmit"
          class="text-primary hover:bg-yellow-200 hover:text-black"
          >Submit</a-button
        >
      </div>
    </a-form>
  </div>
</template>

<style scoped lang="scss"></style>
