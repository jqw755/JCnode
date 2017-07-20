<template>
  <section class="foot">
    <mu-paper>
      <mu-bottom-nav>
        <mu-bottom-nav-item value="recents" title="JCnode" icon="home" iconClass=home_icon  to="/"/>
        <mu-bottom-nav-item value="favorites" title="分类" icon="dashboard" to="/classify"/>
        <mu-bottom-nav-item value="favorites" title="消息" icon="message" to="/message" class="message_tip"/>
        <div class="tip_icon">
          <span>{{unread | formatUnread}}</span>
        </div>
        <mu-bottom-nav-item value="nearby" title="我的" icon="person pin" to="/my"/>
      </mu-bottom-nav>
    </mu-paper>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        unread: 0
      }
    },
    methods: {
      getUnread(){
        const TOKEN = localStorage.getItem('token');
        if (TOKEN) {
          this.axios.get('api/message/count?accesstoken=' + TOKEN).then((response) => {
            if (response.data.success === true) {
              this.unread = response.data.data;
            }
//            console.log(response)
          }).catch(res => {
            console.log(res);
            alert('请求出错');
          });
        }
      },
    },
    filters: {
      formatUnread(count){
        if (count >= 100) {
          return count = 99 + '+';
        }
        return count;
      },
    },
    mounted() {
      this.getUnread(); //未读消息
    },
  }
</script>

<style>
  .home_icon {
    color: cadetblue;
  }

  .foot {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .tip_icon {
    width: 22px;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    background: indianred;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    position: absolute;
    left: 65%;
    top: -3px;
  }

</style>
