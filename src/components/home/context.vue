<template>
  <section class="home_content">
    <mu-list>
      <div class="content_item" v-for="item in scrollData">
        <mu-list-item :title="item.title" :to="`/article?topic_id=` + item.id">
          <!--is top-->
          <mu-icon value="vertical_align_top" slot="right" v-if="item.top"/>
          <mu-avatar :src="item.author.avatar_url" slot="leftAvatar"/>
          <span slot="describe" v-if="item.tab">
            <span>{{item.author.loginname}}</span>
            <span>#{{item.tab}}#</span>
            --<span>{{item.create_at}}</span>
          </span>
        </mu-list-item>
        <div class="item_action" v-if="item.visit_count">
          <mu-flat-button :label="String(item.visit_count) " class="demo-flat-button" icon="visibility" iconClass="iactioin_con" labelClass="action_label" />
          <mu-flat-button :label="String(item.reply_count)" class="demo-flat-button" icon="comment" iconClass="iactioin_con" labelClass="action_label" />
          <mu-flat-button label="最后回复" class="demo-flat-button" icon="fiber_new" iconClass="iactioin_con" labelClass="action_label" />
        </div>
      </div>
    </mu-list>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </section>
</template>

<script>
  export default {
    props: {
      contents: {},
    },
    data() {
      return {
        scData: {},
        loading: false,
        scroller: null
      }
    },
    methods: {
      loadMore () {
        this.loading = true;
        setTimeout(() => {
          this.loading = false
        }, 2000)
      },
      load () {
//        if (this.loading === false) {
        this.loading = true;
//          this.axios.get('api/topics?limit=8&mdrender=false').then((response) => {
//            this.scData = response.data.data;
//            this.loading = false;
//          }).catch(res => {
//            console.log(res);
//            this.loading = false;
//          });
//          console.log(1);
        setTimeout(() => {
          this.loading = false;
        }, 1000);

//        }
      },
    },
    mounted(){
      this.scroller = document.querySelector('.home_content');
    },
    filters:{
        timeFormat(t){

        },
    },
    computed: {
      scrollData(){
        return this.contents;
      },
    }
  }
</script>

<style>
  .home_content {
    width: 100%;
    min-height: 667px;
    height: 667px;
    margin-bottom: 56px;
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .mu-list{
    background: #eee;
    padding:0;
  }

  .mu-infinite-scroll{
    background: #eee;
  }

  .content_item{
    background: #fff;
  }

  .item_action{
    border-bottom: 1px solid #ccc;
  }

  .item_action button{
    width:32.5%;
  }

  .iactioin_con{
    font-size: 17px;
    color: #aaa;
  }

  .action_label{
    font-size: 1rem;
    color: #aaa;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mu-item-right .material-icons {
    color: #f13a11;
  }

  .mu-item-title {
    font-size: 1rem;
  }
</style>
