<script>
export default {
  props: {
    cancel: {
      type: Function,
      required: true,
    },
  },
};
</script>

<template>
  <button type="button" class="cancel-button" @click="cancel">
    Cancel
  </button>
</template>

<style scoped>
.cancel-button {
  border-radius: 10px;
  width: 48%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background: #000000;
  color: white;
}

.cancel-button:hover {
  background: rgb(158, 158, 158);
}
@media (max-width: 768px) {
  .cancel-button {
    width: 100%;
  }
}
</style>