<script setup>
    import { defineModel, defineProps } from "vue";
    defineProps ({
        name: String,
        identifier: String,
        type: String
    })
    let model = defineModel ()
</script>

<style>
</style>

<template>
  <div class="form-group">
    <label :for="identifier">{{ name }}</label>
    <input :type="type" :id="identifier" required v-model="model"/>
  </div>
</template>
