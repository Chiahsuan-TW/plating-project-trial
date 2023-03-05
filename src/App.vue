<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';

const selectedKeys = ref(['1']);
</script>

<template>
  <ALayout class="h-screen">
    <ALayoutHeader class="fixed z-10 w-full">
      <AMenu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <ASubMenu key="1">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>Form</template>
          <RouterLink to="/form-by-Jade"
            ><AMenuItem key="setting:1">Form by Jade</AMenuItem></RouterLink
          >
          <RouterLink to="/form-by-Chiahsuan"
            ><AMenuItem key="setting:2">Form by Chiahusn</AMenuItem>
          </RouterLink>
        </ASubMenu>

        <RouterLink to="/trello-mockup">
          <AMenuItem key="2"> Trello Mockup </AMenuItem>
        </RouterLink>
        <RouterLink to="/e-signature">
          <AMenuItem key="3"> Electronic Signature </AMenuItem>
        </RouterLink>
        <RouterLink to="/presigned-url">
          <AMenuItem key="4"> Presigned URL </AMenuItem>
        </RouterLink>
      </AMenu>
    </ALayoutHeader>
    <ALayoutContent class="mt-20 px-12">
      <div class="bg-white p-6 h-full">
        <RouterView />
      </div>
    </ALayoutContent>
    <ALayoutFooter class="text-center">
      Yuanlin Plating Project ©2023 Created by Jade & Chiahsuan
    </ALayoutFooter>
  </ALayout>
</template>

<style scoped></style>
