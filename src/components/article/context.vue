<template>
  <div class="article_content">
    <div v-html="content"></div>
  </div>
</template>

<script>
  export default {
    props:{
      content:{}
    },
    data() {
      return {}
    }
  }
</script>

<style>
.article_content{
  width: 100%;
  padding:0 1rem;
  margin-top:2rem;

}
  .article_content img{
    height: auto;
    max-width: 100%;
    vertical-align: middle;
    border: 0;
  }

</style>
