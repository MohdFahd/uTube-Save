<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <!-- Add a container element to ensure full-screen layout -->
  <div class="app-container">
    <!-- Render the RouterView to display the current route component -->
    <RouterView />
  </div>
</template>

<!-- Add some basic CSS styles to ensure full-screen layout -->
<style scoped>
.app-container {
  width: 100%;
  height: 100vh; /* Use viewport height for full-screen display */
}
</style>
