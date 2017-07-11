<template>
  <div class="loadingAll">
    <mu-circular-progress :size="40" color="blue"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style>
  .loadingAll {
    position: fixed;
    top: 30%;
    left: 46%;
  }
</style>
