<template>
  <section class="login_container">
    <mu-paper>
      <mu-text-field hintText="your CNode accessToken" class="demo-divider-form" :underlineShow="false"
                     v-model='token'/>
      <mu-divider/>
    </mu-paper>
    <br/><br/>
    <mu-raised-button :label="login_tip" class="demo-raised-button" primary fullWidth @click="login"/>
    <div class="back_door" @click="back_door">{{congratulations}}</div>
  </section>
</template>

<script>
  import * as types from '../../store/type'
  export default {
    data() {
      return {
        msg: '',
        token: null,
        login_tip: 'LOGIN',
        congratulations: ''
      }
    },
    methods: {
      login(){
        const ACCESSTOKEN = this.token,
          parten = /^\s*$/;
        if (ACCESSTOKEN !== null) {
          const is_kong = parten.test(ACCESSTOKEN);
          if (is_kong) {
            this.login_tip = "shit! 全是空格";
            return;
          }
          this.axios({method: 'post', url: 'api/accesstoken?', data: {'accesstoken': ACCESSTOKEN}})
            .then((res) => {
//            console.log(res)
              if (res.data.success === true) {
                const DATA_ = res.data;
                let userinfo = {
                  loginname: DATA_.loginname,
                  id: DATA_.id,
                  avatar_url: DATA_.avatar_url
                };
                this.$store.commit(types.USER, userinfo);
                this.$store.commit(types.LOGIN, ACCESSTOKEN);
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                  path: redirect
                })
              }
            }).catch((res) => {
            console.log(res);
            this.login_tip = "错误的accessToken";
          });
        } else {
          this.login_tip = 'token呢';
        }
      },
      back_door(){
        this.token = '78312849-f056-4d06-b9ce-912d41550bd7';
        this.congratulations = '奇迹啊,你居然发现了后门!!!';
      },
    },
    mounted(){
//      this.$store.commit(types.TITLE, 'Login');
    },
  }
</script>

<style>
  .login_container {
    width: 100%;
    padding: 30% 5%;
  }

  .login_container input {
    padding-left: 8px;
    margin-top: 10px;
  }

  .login_container .mu-text-field {
    margin-bottom: 0;
    width: 100%;
  }

  .mu-text-field-hint {
    top: 10px;
    left: 8px;
  }

  .back_door {
    width: 180px;
    height: 40px;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 2;
    color: red;
  }
</style>
