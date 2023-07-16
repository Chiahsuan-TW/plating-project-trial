<script>
export default {
  name: 'CFormView'
};
</script>

<script setup>
import { reactive, ref } from 'vue';
import API from '@/utils/API.js';
import { LOCATIONS } from '@/const/locations.js';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';

const formRef = ref();
const formState = reactive({
  orderNumber: '',
  model: undefined,
  area: undefined,
  deliveryDate: ''
});

const locationOptions = LOCATIONS.map(location => ({
  label: location.area,
  value: location.area
}));

const router = useRouter();
const onSubmit = () => {
  API.POST('/orders', {
    ...formState,
    deliveryDate: dayjs(formState.deliveryDate).format('YYYY-MM-DD')
  });
  router.push({ name: 'Trello-Mockup' });
};
</script>

<template>
  <div class="about">
    <section class="form bg-white mt-5 px-[42px] py-[30px] w-full">
      <AForm
        :model="formState"
        :wrapperCol="{ span: 24 }"
        autocomplete="off"
        layout="vertical"
        ref="formRef"
      >
        <ARow>
          <ACol>
            <AFormItem
              class="!mb-[30px]"
              label="訂單編號"
              name="orderNumber"
              :wrapperCol="{ span: 24 }"
            >
              <AInput v-model:value="formState.orderNumber" autocomplete />
            </AFormItem>

            <AFormItem
              class="!mb-[30px]"
              label="單車型號"
              name="account"
              :wrapperCol="{ span: 24 }"
            >
              <AInput v-model:value="formState.model" autocomplete />
            </AFormItem>
            <AFormItem
              class="!mb-[30px]"
              label="訂單區域"
              name="area"
              :wrapperCol="{ span: 24 }"
            >
              <ASelect
                :options="locationOptions"
                v-model:value="formState.area"
                autocomplete
              />
            </AFormItem>
            <AFormItem
              class="!mb-[30px]"
              label="交貨日"
              name="password"
              :wrapperCol="{ span: 24 }"
            >
              <ADatePicker
                class="w-full"
                v-model:value="formState.deliveryDate"
                autocomplete
              />
            </AFormItem>
          </ACol>
        </ARow>
        <AButton @click.prevent="onSubmit" type="primary" htmlType="submit"
          >新增</AButton
        >
      </AForm>
    </section>
  </div>
</template>

<style></style>
