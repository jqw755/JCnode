<template>
  <div class="collect_container">
    <loading_v></loading_v>

    <section class="breadcrumb">
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
    </section>

    <section class="collect_content">
      <mu-list>
        <div class="content_item" v-for="item in data">
          <mu-list-item :title="item.title">
            <!--is top-->
            <mu-icon value="vertical_align_top" slot="right" v-if="item.top"/>
            <mu-avatar :src="item.author.avatar_url" slot="leftAvatar"/>
            <span slot="describe">
            <span>{{item.author.loginname}}</span>
            <span>#{{item.tab}}#</span>
            --<span>{{item.create_at}}</span>
          </span>
          </mu-list-item>
          <div class="item_action">
            <mu-flat-button :label="String(item.visit_count) " class="demo-flat-button" icon="visibility"
                            iconClass="iactioin_con" labelClass="action_label"/>
            <mu-flat-button :label="String(item.reply_count)" class="demo-flat-button" icon="comment"
                            iconClass="iactioin_con" labelClass="action_label"/>
            <mu-flat-button label="最后回复" class="demo-flat-button" icon="fiber_new" iconClass="iactioin_con"
                            labelClass="action_label"/>
          </div>
        </div>
      </mu-list>
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
    }
  }
</script>

<style>
  .breadcrumb{
    width: 100%;
    padding: 18px 10px 5px 6px;
    font-size: 1.1rem;
  }
  .breadcrumb a{
    display: inline-block;
    width: 48px;
    color: #696969;
    text-align: center;
  }
</style>
