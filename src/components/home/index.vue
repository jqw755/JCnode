<template>
  <div class="home">
    <loading_v></loading_v>
    <home_title></home_title>
    <home_context :contents="data"></home_context>
    <home_nav></home_nav>
    <!--new topic entrance-->
    <div class="newTopic">
      <router-link to="/newTopic">
        <mu-icon value="edit" :size="22" color="white"/>
      </router-link>
    </div>
  </div>
</template>

<script>
  //  import {bus} from '../../utils/bus'
  import loading_v from '../loading/loading'
  import {loading} from '../../utils/loading'
  import home_title from './homeTitle'
  import home_context from './context'
  import home_nav from './homeNav'
  export default {
    data() {
      return {
        data: [],
      }
    },
    methods: {
      getHomeTopic(){
        this.axios.get('api/topics?limit=8&mdrender=false').then((response) => {
          loading.hide();
          if (response.data.success === true) {
            this.data = response.data.data;
//          console.log(response)
          }
        }).catch(res => {
          console.log(res);
          alert('请求出错');
        });
      },
    },
    mounted() {
      this.getHomeTopic();

    },
    components: {
      loading_v, home_title, home_context, home_nav
    }
  }
</script>

<style>
  .newTopic{
    width: 42px;
    height: 42px;
    border-radius:50%;
    -webkit-border-radius:50%;
    background: dodgerblue;
    text-align: center;
    line-height:54px;
    position: fixed;
    bottom:80px;
    right:20px;
    z-index:5;
  }
</style>

