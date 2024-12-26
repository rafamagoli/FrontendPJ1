<script setup>
import { defineModel, defineProps } from "vue";
defineProps({
    name: String,
    identifier: String,
    type: {
        type: String,
        default: "text"
    }
});
let model = defineModel();
</script>

<template>
  <div class="form-group">
    <label :for="identifier">{{ name }}</label>
    <input :type="type" :id="identifier" required v-model="model"/>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>