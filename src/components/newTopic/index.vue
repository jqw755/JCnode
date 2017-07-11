<template>
  <div class="">
    <loading_v></loading_v>
    <section class="classification clear_fix">
      <p class="info_p">选择板块:</p>
      <mu-select-field v-model="classify_val" class="select_classify">
        <mu-menu-item v-for="(text,index) in list" :key="index" :value="index" :title="text"/>
      </mu-select-field>
      <p class="topic_title">
        <mu-text-field hintText="输入标题" v-model="title_val"/>
      </p>
    </section>

    <section class="vue2-editor clear_fix">
      <vue-editor v-model="content"></vue-editor>
      <mu-raised-button label="发表" class="save_btn" @click="saveContent"/>
      <mu-raised-button label="取消" class="cancel_btn" @click="cancel_new"/>
    </section>
    <p class="test">*测试话题，不要发太多</p>

    <section class="cancel_dialog">
      <mu-dialog :open="dialog" title="提示!" @close="close">
        取消发表话题?
        <mu-flat-button slot="actions" @click="close" primary label="取消"/>
        <mu-flat-button slot="actions" primary to="/home" label="确定"/>
      </mu-dialog>
    </section>

    <section class="toast">
      <mu-toast v-if="toast" :message="toast_msg" @close="hideToast" class="topic_toase"/>
    </section>
  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor'
  import loading_v from '../loading/loading'
  import {loading} from '../../utils/loading'
  export default {
    data() {
      return {
        classify_val: 0,
        list: ['请选择', '分享', '问答', '招聘', '客户端测试'],
        title_val: '',
        content: '<h3>Write something ...</h3>',
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
//      未选择板块
        if (this.classify_val === 0) {
          this.toast_msg = '请选择板块!';
          this.showToast();
          return false;
        }
        if (this.list[this.classify_val] !== '客户端测试') {
          this.toast_msg = '仅支持 客户端测试 板块!';
          this.showToast();
          return false;
        }
//      未填写标题
        if (this.title_val === '') {
          this.toast_msg = '请填写标题!';
          this.showToast();
          return false;
        }
        console.log(this.content);
//      token for test:  78312849-f056-4d06-b9ce-912d41550bd7
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
        }else{
          this.toast_msg = '没有token';
          this.showToast();
          return false;
        }
      },
      cancel_new () {
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
    },
    mounted() {
      loading.hide();
    },
    components: {
      VueEditor,
      loading_v
    }
  }
</script>

<style>
  .test{
    color: #adabab;
    text-align: right;
    margin-right: 10px;
  }

  .classification {
    width: 100%;
    padding: 10px 10px;
  }

  .select_classify {
    margin-bottom: 0;
    text-align: center;
  }

  .mu-dropDown-menu {
    font-size: 0.95rem;
  }

  .classification .info_p {
    display: inline-block;
    float: left;
  }

  .info_p {
    margin-top: 0.7rem;
  }

  .topic_title > div {
    width: 100%;
    font-size: 1rem;
  }

  .topic_title > div {
    margin-bottom: 0;
  }

  .topic_toase {
    width: 60%;
    height: 38px;
    line-height: 38px;
    left: 20%;
    font-size: 0.9rem;
    text-align: center;
    letter-spacing: 1px;
    background-color: #fb3232;
  }

  .save_btn,
  .cancel_btn {
    margin: 10px 10px 0 0;
    background: dodgerblue;
    color: #fff;
    float: right;
  }

  .cancel_btn {
    background: #aaa;
    float: right;
  }

</style>
