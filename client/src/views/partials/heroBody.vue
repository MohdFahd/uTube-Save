<template>
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
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
