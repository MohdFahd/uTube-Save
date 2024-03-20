<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="sup_plt border-top border-1"
    style="background-color: red; transition: opacity 0.5s ease-in-out"
  >
    <p class="text-center">{{ msg }}</p>
  </div>
</template>
