<template>
    <div 
        class="aspect-ratio"
        :style="{'--aspect-ratio-h': 1, '--aspect-ratio-w': aspectRatioWidth}">
        <img v-if="isHTTPLink" :src="actualSource" alt="image of product" ref="image">
        <img v-if="!isHTTPLink" src="../assets/logo.jpeg" alt="Logo of company" ref="image">
    </div>
</template>

<script>
export default {
  name: "ImageWithAspectRatio",
  props: {
    source:"",
   
  },
  data() {
    return {
      aspectRatioWidth: 1,
      isHTTPLink: "",
      actualSource: ""
    };
  },
  mounted() {
    this.actualSource = this.source;
    const aspectRatio =
      this.$refs.image.naturalWidth / this.$refs.image.naturalHeight;
    this.aspectRatioWidth = aspectRatio;
    this.isHTTPLink = this.source ? this.source.includes("http") : false;
  },
  watch: {
    source() {
      this.$refs.image.src = this.source;
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

