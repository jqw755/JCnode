<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import * as types from './store/type'
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    computed: mapState({
      title: state => state.title,
      token: state => state.token
    }),
  }
</script>

<style>
  .clear_fix{
    content: '';
    display: inline-block;
    clear: both;
  }
  .loading_active {
    display: none;
  }

  /*css自定义主流浏览器滚动条*/
  /*::-webkit-scrollbar{width:9px;}*/
  /*::-webkit-scrollbar-thumb{border-radius:5px;background-color:#02cbd7;}*/
  /*::-webkit-scrollbar-track{background-color: #d702cf;}*/

  p{
    margin: 0;
  }
</style>
