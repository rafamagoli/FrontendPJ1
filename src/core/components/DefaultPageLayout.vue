<template>

  <UserHeader></UserHeader>
  <UserSideBar></UserSideBar>
  <router-view />
</template>

<style>

</style> 

<script setup>
import UserHeader from '@/components/user/UserHeader.vue';
import UserSideBar from '@/components/user/UserSideBar.vue';
</script>
