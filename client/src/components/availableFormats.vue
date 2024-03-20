<script setup>
import { defineProps, ref, watch } from "vue";

defineProps({
  Formats: {
    type: Array,
    required: true,
  },
  SelectedFormat: {
    type: String,
    required: true,
  },
});

const emitFormatSelected = (selectedFormat) => {
  emit("formatSelected", selectedFormat);
};

const selectedFormat = ref(SelectedFormat);

watch(selectedFormat, (newValue) => {
  emitFormatSelected(newValue);
});
</script>

<template>
  {{ Formats }}
  <ul>
    <div class="wrapper" v-for="Format in Formats" :key="Format">
      <div class="option">
        <input
          class="input"
          v-model="selectedFormat"
          type="radio"
          name="btn"
          :value="Format.qualityLabel"
        />
        <div class="btn">
          <span class="span">{{ Format.qualityLabel }}</span>
        </div>
      </div>
    </div>
  </ul>
</template>
