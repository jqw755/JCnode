<template>
  <div class="article_container">
    <loading_v></loading_v>
    <!--话题标题相关-->
    <section class="article_head">
      <mu-list-item :title="data.title">
        <!--is top-->
        <mu-icon value="vertical_align_top" slot="right" v-if="data.top"/>
        <mu-avatar :src="author.avatar_url" slot="leftAvatar"/>
        <span slot="describe">
            <span>{{author.loginname}}</span>
            <span>#{{data.tab}}#</span>
            --<span>{{data.create_at}}</span>
          </span>
      </mu-list-item>
      <action :topic_id="data.id" :is_collect="data.is_collect"></action>
    </section>
    <!--话题内容-->
    <Context :content="data.content"></Context>
    <!--评论-->
    <comment :replies_="data.replies"></comment>
    <!--快速回复-->
    <reply></reply>
  </div>
</template>

<script>
  import loading_v from '../loading/loading'
  import {loading} from '../../utils/loading'
  import Context from './context'
  import comment from './comment'
  import reply from './reply'
  import action from './action'
  export default {
    data() {
      return {
        data: {},
        author: {},
      }
    },
    methods: {
      getArticle(){
        const self = this,
          ARTICLE_ID = this.$route.query.topic_id;
        let url = '';
        if (ARTICLE_ID) {
          if (this.$store.state.token !== null) {
            url = 'api/topic/' + ARTICLE_ID + '?accesstoken=' + this.$store.state.token;
          } else {
            url = 'api/topic/' + ARTICLE_ID;
          }
          self.axios.get(url).then((response) => {
            loading.hide();
            if (response.data.success === true) {
              console.log(response)
              self.data = response.data.data;
              self.author = response.data.data.author;
            }
          }).catch(res => {
            console.log(res);
            alert('请求出错');
          });
        } else {
          console.log('没有话题ID')
        }
      },
    },
    mounted(){
      this.getArticle();
    },
    components: {
      loading_v,
      Context,
      comment,
      reply,
      action
    }
  }
</script>

<style>
  .article_action {
    padding: 0 1.2rem;
  }

  .demo-float-button {
    float: right;
  }

</style>
