<template>
  <select
    class="form-select w-50 bg-danger text-white"
    aria-label="Default select example"
    @change="emitOption"
  >
    <option value="" selected>Select The Format</option>
    <option
      :value="format.qualityLabel"
      v-for="format in formats"
      :key="format"
    >
      {{ format.qualityLabel }}
    </option>
  </select>
</template>

<script>
// import { defineProps, defineEmits } from "vue";

export default {
  props: {
    formats: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const emitOption = (event) => {
      const selectedValue = event.target.value;
      // Emit the selected option value to the parent component
      emit("option-selected", selectedValue);
    };

    return {
      emitOption,
    };
  },
};
</script>
