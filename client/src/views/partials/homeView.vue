<template>
  <section class="hero">
    <div class="container">
      <heroHeader />
      <heroBody>
        <slot />
      </heroBody>
    </div>
  </section>
</template>

<script setup>
import heroHeader from "./heroHeader.vue";
import heroBody from "./heroBody.vue";
</script>

<style></style>
