<template>
  <div class="collect_container">
    <loading_v></loading_v>

    <section class="breadcrumb">
      <mu-sub-header>
        <router-link to="/">
          <span>主页</span>
        </router-link>
        <span>/</span>
        <router-link to="/my">
          <span>我的</span>
        </router-link>
        <span>/</span>
        <router-link to="/topicCollect">
          <span style="color: #ff4081;">收藏</span>
        </router-link>
      </mu-sub-header>
    </section>

    <section class="collect_content">
      <context :contents="data"></context>
    </section>

    <section class="page">
      <mu-pagination :total="total" :current="current" @pageChange="handleClick">
      </mu-pagination>
    </section>
  </div>
</template>

<script>
  import loading_v from '../../loading/loading'
  import {loading} from '../../../utils/loading'
  import context from '../../home/context'
  export default{
    data(){
      return {
        data: {},
        userinfo:{},
        current: 1,
        total: 50
      }
    },
    methods: {
      getCollect(){
        const USERINFO = JSON.parse(localStorage.getItem('user'));
        if (USERINFO) {
          this.userinfo = USERINFO;
        } else {
          this.$router.push('/login');
        }
        this.axios.get('api/topic_collect/' + this.userinfo.loginname).then((response) => {
          if (response.data.success === true) {
            this.data = response.data.data;
            loading.hide();
//          console.log(response)
          }
        }).catch(res => {
          console.log(res);
          alert('请求出错');
        });
      },
      handleClick (newIndex) {}
    },
    mounted() {
      this.getCollect();
    },
    components: {
      loading_v,
        context
    }
  }
</script>

<style>
  .breadcrumb{
    width: 100%;
    font-size: 1.1rem;
  }
  .breadcrumb a{
    display: inline-block;
    width: 48px;
    color: #696969;
    text-align: center;
  }
</style>
