<template>
    <div 
        class="aspect-ratio"
        :style="{'--aspect-ratio-h': 1, '--aspect-ratio-w': aspectRatioWidth}">
        <img v-if="isHTTPLink" :src="actualSource" alt="image of product" ref="image">
        <img 
          v-if="!isHTTPLink && actualSource !== '' && actualSource != null"
          :src="require(`../assets${source}`)"
          alt="Logo of company" ref="image">
    </div>
</template>

<script>
export default {
  name: "ImageWithAspectRatio",
  props: {
    source: String
  },
  data() {
    return {
      aspectRatioWidth: 1,
      isHTTPLink: "",
      actualSource: ""
    };
  },
  mounted() {
    if (this.source != null) {
      // figuring out if source is link or file
      this.isHTTPLink =
        this.source != null ? this.source.substring(0, 4) === "http" : false;
      // if source is not link then we consider it's located in assets folder
      this.actualSource = this.isHTTPLink
        ? this.source
        : `../assets${this.source}`;
      if (this.$refs.image) {
        const aspectRatio =
          this.$refs.image.naturalWidth / this.$refs.image.naturalHeight;
        this.aspectRatioWidth = aspectRatio;
      }
    }
  },
  watch: {
    source() {
      if (this.source != null) {
        this.actualSource = this.source;
        this.isHTTPLink = this.source.substring(0, 4) === "http";
      }
    }
  }
};
</script>
<style scoped>
.aspect-ratio > img {
  position: static;
  height: auto;
}
.aspect-ratio::before {
  padding-top: 0px !important;
}
</style>

