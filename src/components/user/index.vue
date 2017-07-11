<template>
  <div class="my_container">
    <loading_v></loading_v>
    <section class="my_head">
      <div class="menu_icon">
        <mu-icon-menu
          icon="more_vert"
          :anchorOrigin="rightTop"
          :targetOrigin="rightTop"
        >
          <mu-menu-item title="首页" href="/"/>
          <mu-menu-item title="设置"/>
        </mu-icon-menu>
      </div>
      <mu-chip class="demo-chip">
        <mu-avatar :size="40" :src="userinfo.avatar_url"/>
        {{userinfo.loginname}}
      </mu-chip>
    </section>

    <section class="my_content">
      <mu-list>
        <mu-list-item title="话题" to="/topicCollect">  <!-- 这里用to跳转，跳过去会报错，后面解决 07/08-->
          <mu-icon slot="right" value="keyboard_arrow_right" color="#aaa"/>
        </mu-list-item>
        <mu-list-item title="评论">
          <mu-icon slot="right" value="keyboard_arrow_right" color="#aaa"/>
        </mu-list-item>
        <mu-list-item title="github">
          <mu-avatar color="#aaa" class="item_rightArrow" backgroundColor="transparent" slot="right">
            /{{data.githubUsername}}
          </mu-avatar>
        </mu-list-item>
        <mu-list-item title="CNode积分">
          <mu-avatar color="#aaa" class="item_rightArrow" slot="right">{{data.score}}</mu-avatar>
        </mu-list-item>
      </mu-list>
    </section>

    <section class="my_foot">
      <mu-raised-button class="demo-raised-button login_out" @click="openBottomSheet" label="退出" icon="info" backgroundColor="#ccc"/>
      <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
        <mu-list @itemClick="closeBottomSheet">
          <mu-sub-header>退出账号?</mu-sub-header>
          <mu-list-item title="确定" @click="loginout"/>
          <mu-list-item title="取消"/>
        </mu-list>
      </mu-bottom-sheet>
    </section>
  </div>
</template>

<script>
  import * as types from '../../store/type'
  import loading_v from '../loading/loading'
  import {loading} from '../../utils/loading'
  export default {
    data() {
      return {
        userinfo: {},
        data: {},
        rightTop: {horizontal: 'right', vertical: 'top'},
        bottomSheet: false,
      }
    },
    methods: {
      getUser(){
        const USERINFO = JSON.parse(localStorage.getItem('user'));
        if (USERINFO) {
          this.userinfo = USERINFO;
        } else {
          this.$router.push('/login');
        }
      },
      getUserData(){
        this.axios.get('api/user/' + this.userinfo.loginname).then((response) => {  //
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
      loginout(){
        this.$store.commit(types.LOGOUT);
        this.$router.push('/home');
      },
      closeBottomSheet () {
        this.bottomSheet = false;
      },
      openBottomSheet () {
        this.bottomSheet = true;
      },
    },
    components: {
      loading_v,
    },
    mounted(){
      this.getUser();
      this.getUserData();
    }
  }
</script>

<style>
  .my_container {
    width: 100%;
    height: 100%;
  }

  .my_head {
    width: 100%;
    margin-top: 1.5rem;
    text-align: center;
  }

  .my_head .menu_icon {
    float: right;
  }

  .mu-list {
    background: #f6f6f6;
  }

  .mu-item-left, .mu-item-right {
    width: 70px;
  }

  .mu-item-title{
    font-size: 1rem;
  }

  .item_rightArrow {
    font-size: 13px;
    color: #aaa;
    text-align: left;
    width: 100%;
    background: transparent;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .my_foot {
    width: 80%;
    position: absolute;
    bottom: 3%;
    left: 10%;
  }

  .my_foot .login_out {
    width: 100%;
  }
</style>
