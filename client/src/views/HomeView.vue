<script setup>
import { ref } from "vue";
import axios from "axios";

const link = ref();
axios
  .get("/getData", link)
  .then((response) => {
    // Handle successful response
    console.log(response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error:", error);
  });
</script>
<template>
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col">
          <img
            loading="lazy"
            src="/assets/youtube-save-logo.png"
            alt="Video Max"
            width="180"
            height="52"
            class="img-fluid"
          />
        </div>
        <!-- <div class="col">
            <img
              loading="lazy"
              src="/assets/img/ps.png"
              alt="Video Max"
              width="20%"
              class="img-fluid"
            />
          </div> -->
      </div>
      <div class="hero_body">
        <!-- <img
            loading="lazy"
            src="/assets/youtube-save-logo.png"
            alt="Video Max"
            width="180"
            height="52"
            class="img-fluid"
          /> -->
        <div class="text-center"><span class="line_head"></span></div>
        <span class="sub_tit">Online Video</span>
        <h1>Youtube Downloader</h1>
        <div class="txt_hero">
          <div id="txt_hero" class="carousel slide" data-bs-ride="true">
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#txt_hero"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#txt_hero"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#txt_hero"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner pb-4">
              <div class="carousel-item active">
                <p>
                  Do not look more! Explore our
                  <span>ٰYoutubeSave</span> video downloader, a free solution to
                  quickly download videos or music with just one click!
                </p>
              </div>
              <div class="carousel-item">
                <p>
                  Download your favorite Youtbe videos with
                  <span>ٰYoutubeSave</span> The ultimate YouTube downloader tool
                  that transforms online videos into your personal device.
                </p>
              </div>
              <div class="carousel-item">
                <p>
                  Improve your YouTube experience with our
                  <span>User friendly downloader tool</span> put your favourite
                  videos at your fingertips for offline watching.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="frm_dl dl_cm_st">
          <form
            method="post"
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
                type="submit"
                submit="true"
                class="btn_dl d-none d-md-block"
              >
                <span>Download <i class="fa-solid fa-arrow-right"></i></span>
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

          <div
            class="dl_list hidden rounded"
            id="download_list"
            style="width: 100%"
          ></div>

          <div class="sup_plt border-top border-1" v-if="Formats">
            <p>Available Formats:</p>
            <ul>
              <div class="wrapper">
                <div class="option">
                  <input
                    class="input"
                    type="radio"
                    name="btn"
                    value="option3"
                  />
                  <div class="btn">
                    <span class="span"></span>
                  </div>
                </div>
              </div>
            </ul>
          </div>

          <div
            v-show="message"
            class="sup_plt border-top border-1"
            style="background-color: red"
          >
            <p class="text-center"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
