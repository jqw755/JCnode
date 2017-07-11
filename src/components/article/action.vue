<template>
  <div class="article_action clear_fix">
    <mu-raised-button :label="favorite_label" labelPosition="after" :icon="icon_val" :color="favorite_color"
                      @click="favorite"/>
  </div>
</template>

<script>
  export default {
    props: {
      topic_id: null,
      is_collect: false,
    },
    data() {
      return {
        token: '',
        favorite_flag: false,
        icon_val: 'favorite_border',
        favorite_label: '收藏',
        favorite_color: 'gray'
      }
    },
    methods: {
//    点击收藏话题
      favorite(){
        const self = this,
          ACCESSTOKEN = self.$store.state.token;
        if (!ACCESSTOKEN) {
          const REDIRECT = 'article?topic_id=' + self.topic_id;
          self.$router.push('/login?redirect=' + REDIRECT);
          return;
        }
        if (self.favorite_flag === false) {
          self.axios({
            method: 'post',
            url: 'api/topic_collect/collect',
            data: {
              'accesstoken': ACCESSTOKEN,
              'topic_id': self.topic_id
            }
          }).then((res) => {
            console.log(0)
            if (res.data.success === true) {
              self.favorite_flag = true;
              self.icon_val = 'favorite';
              self.favorite_label = '已收藏';
              self.favorite_color = 'red';
            }
          }).catch((res) => {
            console.log(res)
          });
        } else {
          self.axios({
            method: 'post',
            url: 'api/topic_collect/de_collect',
            data: {
              'accesstoken': ACCESSTOKEN,
              'topic_id': self.topic_id
            }
          }).then((res) => {
            console.log(1)
            if (res.data.success === true) {
              self.favorite_flag = false;
              self.icon_val = 'favorite_border';
              self.favorite_label = '收藏';
              self.favorite_color = 'gray';
            }
          }).catch((res) => {
            console.log(res)
          });
        }
      },
      init_collect(){
        if (this.is_collect === true) {
          const self_ = this;
          self_.favorite_flag = true;
          self_.icon_val = 'favorite';
          self_.favorite_label = '已收藏';
          self_.favorite_color = 'red';
        }
      },
    },
    mounted(){
    },
    watch: {
//    加载判断是否为已收藏
      is_collect(val){
        return this.init_collect();
      }
    }
  }
</script>

<style>

</style>
