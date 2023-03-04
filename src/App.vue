<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const selectedKeys = ref(['1']);

</script>

<template>
  <a-layout class="h-screen">
    <a-layout-header class="fixed z-10 w-full">
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">

        <a-sub-menu key="1">
          <template #icon>
            <setting-outlined />
          </template>
          <template #title>Form</template>
          <RouterLink to="/form-by-Jade"><a-menu-item key="setting:1">Form by Jade</a-menu-item></RouterLink>
          <RouterLink to="/form-by-Chiahsuan"><a-menu-item key="setting:2">Form by Chiahusn</a-menu-item>
          </RouterLink>
        </a-sub-menu>

        <RouterLink to="/trello-mockup">
          <a-menu-item key="2">
            Trello Mockup
          </a-menu-item>
        </RouterLink>
        <RouterLink to="/e-signature">
          <a-menu-item key="3">
            Electronic Signature
          </a-menu-item>
        </RouterLink>
        <RouterLink to="/presigned-url">
          <a-menu-item key="4">
            Presigned URL
          </a-menu-item>
        </RouterLink>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="mt-20 px-12">
      <div class="bg-white p-6 h-full">
        <RouterView />
      </div>
    </a-layout-content>
    <a-layout-footer class="text-center">
      Yuanlin Plating Project ©2023 Created by Jade & Chiahsuan
    </a-layout-footer>
  </a-layout>
</template>

<style scoped></style>
