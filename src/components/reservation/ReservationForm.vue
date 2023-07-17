<script>
export default {
  name: 'ReservationForm'
};
</script>

<script setup>
import { reactive, ref, watch } from 'vue';

const formState = reactive({
  licensePlateNo: undefined,
  brand: undefined,
  type: undefined,
  model: undefined
});

const onFinish = values => {
  console.log('Success:', values);
};

const brandOptions = ref([
  {
    value: 1,
    label: 'TOYOTA'
  },
  {
    value: 2,
    label: 'TESLA'
  },
  {
    value: 3,
    label: 'Volvo'
  },
  {
    value: 4,
    label: 'MiniCooper'
  }
]);

// dynamic
const typeOptions = ref([
  {
    value: 1,
    label: '小客車'
  },
  {
    value: 2,
    label: '大型車'
  },
  {
    value: 3,
    label: '貨櫃車'
  }
]);

const modelOptions = ref([
  {
    value: 1,
    label: 'SIENTA'
  },
  {
    value: 2,
    label: 'VOYAGE'
  },
  {
    value: 3,
    label: 'MODEL3'
  }
]);

const validateSuccess = ref(false);

// 確認必填欄位皆填寫才開啟按鈕
watch(
  formState,
  newValues => {
    validateSuccess.value = Object.keys(newValues)
      .filter(key => key !== 'model')
      .map(fieldName => {
        const value = newValues[fieldName];
        return typeof value === 'string' && !value.trim().length
          ? undefined
          : newValues[fieldName];
      })
      .every(value => value !== undefined);
  },
  {
    deep: true
  }
);
</script>

<template>
  <section>
    <pre>validate status {{ validateSuccess }}</pre>
    <AForm
      :model="formState"
      name="basic"
      :wrapperCol="{ span: 24 }"
      autocomplete="off"
      @finish="onFinish"
      layout="vertical"
    >
      <ARow :gutter="40" align="top">
        <ACol :span="10">
          <AFormItem
            label="車牌/引擎/車身號碼"
            name="licensePlateNo"
            :wrapperCol="{ span: 24 }"
            :rules="[{ required: true }]"
          >
            <AInput v-model:value="formState.licensePlateNo" />
          </AFormItem>
        </ACol>
        <ACol :span="14">
          <label class="block">車型</label>
          <ASpace :size="10" class="mt-2">
            <AFormItem class="w-48" name="brand">
              <ASelect
                v-model:value="formState.brand"
                :options="brandOptions"
              ></ASelect>
            </AFormItem>
            <AFormItem class="w-40" name="type">
              <ASelect
                v-model:value="formState.type"
                :options="typeOptions"
              ></ASelect>
            </AFormItem>
            <AFormItem class="w-48" name="model">
              <ASelect
                v-model:value="formState.model"
                :options="modelOptions"
              ></ASelect>
            </AFormItem>
          </ASpace>
        </ACol>
        <ACol :span="24" :md="{ span: 12 }" :lg="{ span: 6 }">
          <div class="text-green">
            mobile: full, tablet: half, desktop: four
          </div>
        </ACol>
        <ACol :span="24" :md="{ span: 12 }" :lg="{ span: 6 }">
          <div class="bg-warning">
            mobile: full, tablet: half, desktop: four
          </div>
        </ACol>
        <ACol :span="24" :md="{ span: 12 }" :lg="{ span: 6 }">
          <div>mobile: full, tablet: half, desktop: four</div>
        </ACol>
        <ACol :span="24" :md="{ span: 12 }" :lg="{ span: 6 }">
          <div class="text-sm tablet:text-xl">
            mobile: full, tablet: half, desktop: four
          </div>
        </ACol>
      </ARow>

      <AFormItem :wrapperCol="{ span: 8 }">
        <AButton :disabled="!validateSuccess" type="primary" htmlType="submit"
          >Submit</AButton
        >
      </AFormItem>
    </AForm>
  </section>
</template>

<style></style>
