<template>
    <div>
        <input type="range" class="average-call-time-input" :value="averageCallTime"/>
        <div class="gradient"></div>
    </div>
</template>

<script>
export default {
  name: "AverageCallTime",
  props: { averageCallTime: String }
};
</script>

<style scoped>
.average-call-time-input{
    width: 100%;
}
.gradient {
  height: 1rem;

  background: rgba(230, 18, 18, 1);
  background: -moz-linear-gradient(
    left,
    rgba(230, 18, 18, 1) 0%,
    rgba(145, 232, 66, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(230, 18, 18, 1)),
    color-stop(100%, rgba(145, 232, 66, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(230, 18, 18, 1) 0%,
    rgba(145, 232, 66, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(230, 18, 18, 1) 0%,
    rgba(145, 232, 66, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(230, 18, 18, 1) 0%,
    rgba(145, 232, 66, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(230, 18, 18, 1) 0%,
    rgba(145, 232, 66, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e61212', endColorstr='#91e842', GradientType=1 );
}
</style>