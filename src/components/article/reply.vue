<template>
  <div class="reply_container clear_fix">
    <mu-sub-header style="color:#444;background-color: #f6f6f6">添加回复</mu-sub-header>
    <vue-editor v-model="content"></vue-editor>
    <mu-raised-button label="发表" class="save_btn" @click="saveContent"/>

    <section class="toast">
      <mu-toast v-if="toast" :message="toast_msg" @close="hideToast" class="topic_toase"/>
    </section>
  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor'
  export default {
    data() {
      return {
        content: '',
        toast: false,
        toast_msg: '',
        dialog: false,
      }
    },
    methods: {
//    toast方法
      showToast () {
        this.toast = true;
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.toast = false;
        }, 2800);

      },
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer);
      },
      saveContent: function () {
//      未填写标题
        if (this.content === '') {
          this.toast_msg = '你还没有填写内容!';
          this.showToast();
          return false;
        }
        console.log(this.content);
        if (this.$store.state.token) {
          loading.show();
          this.axios({
            method: 'post',
            url: 'api/topics',
            data: {
              accesstoken: this.$store.state.token,
              title: this.title_val,
              tab: 'dev',
              content: this.content
            }
          }).then((res) => {
            loading.hide();
            if (res.data.success === true) {
              console.log(res);
              this.toast_msg = '发表成功!';
              this.showToast();
              this.$router.push('/home');
            } else {
              console.log(res);
            }
          }).catch((res) => {
            loading.hide();
            console.log(res);
            alert("error");
          });
        } else {
          this.toast_msg = '没有token';
          this.showToast();
          return false;
        }
      },
      close () {
        this.dialog = false
      },
    },
    components: {
      VueEditor,
    }
  }
</script>

<style>
  .reply_container {
    margin-bottom: 2rem;
  }

  .reply_container #quill-container {
    height: 250px;
  }

  .save_btn,
  .cancel_btn {
    margin: 10px 10px 0 0;
    background: dodgerblue;
    color: #fff;
    float: right;
  }

</style>
