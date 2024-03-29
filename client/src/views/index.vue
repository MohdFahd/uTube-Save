<script setup>
import homeView from "./partials/homeView.vue";
import heroInfo from "./partials/heroInfo.vue";
import Message from "../components/Message.vue";
import loadingBar from "../components/loadingBar.vue";
import selectOption from "../components/selectOption.vue";

// import availableFormats from "../components/availableFormats.vue";

import { ref, onMounted } from "vue";
import axios from "axios";
const link = ref("");
const formaVid = ref("");
const errorMessage = ref(""); // Variable to store error message
const Formats = ref("");
const progress = ref(0); // Variable
const downloadUrl = ref(""); // Define downloadUrl outside initSSE
const vidInfo = ref(""); // Define vidInfo
const loading = ref(false); // Define loading

// Define a method to handle the emitted event
const handleOptionSelected = (value) => {
  console.log(value);
  formaVid.value = value;
};
const submitForm = () => {
  // Reset error message
  errorMessage.value = "";
  Formats.value = "";
  loading.value = true;
  vidInfo.value = "";

  // Send request to server
  axios
    .post("http://localhost:3000/getData", {
      link: link.value,
      format: formaVid.value,
    })
    .then((response) => {
      // Handle successful response
      // console.log(response.data);
      errorMessage.value = response.data.message; // Display message from the server
      Formats.value = response.data.formats; // Display message from the server
      loading.value = false;
      vidInfo.value = response.data.videoDetails; // Display message from the server
    })

    .catch((error) => {
      // Handle error
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Set error message received from server
        errorMessage.value = error.response.data.message;
      } else {
        errorMessage.value = "An unexpected error occurred.";
      }
    });
};
// Function to establish SSE connection and receive progress updates
const initSSE = () => {
  const eventSource = new EventSource("http://localhost:3000/progress");
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    progress.value = Math.round(data.progress); // Update download progress
    if (progress.value === 100) {
      downloadUrl.value = `http://localhost:3000/download?format=${
        formaVid.value
      }&link=${encodeURIComponent(link.value)}`;
    }
  };
};
// Initialize SSE connection when the component is mounted
onMounted(() => {
  initSSE();
});
</script>

<template>
  <!-- Display the home view  -->
  <homeView>
    <form
      method="post"
      action=""
      @submit.prevent="submitForm"
      onsubmit="return download();"
    >
      <div class="input-group">
        <span class="input-group-text"
          ><svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m19.775 14.825 3.3-3.3a4.666 4.666 0 1 0-6.6-6.6l-3.3 3.3M8.225 13.175l-3.299 3.3a4.666 4.666 0 0 0 0 6.6v0a4.666 4.666 0 0 0 6.6 0l3.3-3.3M6.58 9.87l-2.474-.817M9.87 6.58l-.817-2.473M21.42 18.13l2.484.817M18.129 21.42l.817 2.485M10.698 17.302l6.604-6.604"
              stroke="#303030"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          ></span
        >

        <input
          type="text"
          onpaste="setTimeout(() => {download()}, 0);"
          class="form-control"
          name="link"
          v-model="link"
          required
          placeholder="Paste your video link here"
        />
        <button
          :disabled="loading"
          type="submit"
          submit="true"
          class="btn_dl d-none d-md-block"
        >
          <span v-if="loading === false"> Download </span>
          <span v-else>
            <loadingBar />
          </span>
          <span
            class="d-none spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
        </button>
        <button
          aria-label="Download"
          type="submit"
          submit="true"
          class="btn_dl p-3 d-block d-md-none"
          style="border-radius: 20px 45px 45px 20px !important"
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12.076H5M14 17.076l5-5M14 7.076l5 5"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <span
            class="d-none spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </form>

    <div class="sup_plt border-top border-1 flex bg-danger" v-if="Formats">
      <div class="flex justify-content-center items-center mx-auto">
        <img :src="vidInfo.img" width="150px" height="100px" alt="" />
      </div>
      <div class="card-body text-end me-4">
        <h5 class="card-title">{{ vidInfo.title }}</h5>
        <p class="card-text">{{ vidInfo.lengthSeconds }}</p>
        <selectOption
          :formats="Formats"
          @option-selected="handleOptionSelected"
        />
      </div>
    </div>

    <div class="sup_plt border-top border-1" v-if="progress > 0">
      <div class="progress" style="width: 100%">
        <div
          class="progress-bar bg-primary"
          role="progressbar"
          :style="{ width: progress + '%' }"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ progress }}%
        </div>
      </div>
      <div v-if="progress === 100" class="d-flex">
        <a :href="downloadUrl" class="btn btn-primary" target="_blank"
          >Download</a
        >
      </div>
    </div>
    <Message :msg="errorMessage" v-show="errorMessage" />

    <!-- <progress id="downloadProgress" :value="progress" max="100"></progress>
    <span id="progressText">{{ progress }}% </span> -->
  </homeView>
  <!--  -->
  <heroInfo />
</template>
