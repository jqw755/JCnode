<template>
  <div class="comment_container">
    <mu-sub-header style="color:#444;background-color: #f6f6f6"><!--{{replies_.length}}-->回复</mu-sub-header>
    <div class="comment_item" v-for="(item,index) in replies_">
      <mu-list>
        <!--评论人信息-->
        <mu-list-item :title="item.author.loginname" titleClass="title_class" :afterText="String(index+1)+'楼'"
                      afterTextClass="afterText_class" :describeLine=Number(60)>
          <mu-avatar :src="item.author.avatar_url" slot="leftAvatar"/>
          <!--评论内容-->
          <div slot="describe">
            <div class="describeText_class" v-html="item.content"></div>
          </div>
          <!--点赞与回复-->
          <UR :item="item"></UR>
        </mu-list-item>
        <mu-divider inset/>
      </mu-list>
    </div>
  </div>
</template>

<script>
  import UR from './upAndreply.vue'
  export default {
    props: {
      replies_: {}
    },
    data() {
      return {}
    },
    methods:{},
    mounted(){},
    components:{
      UR,
    },
  }
</script>

<style>
  .comment_container {
    margin-top:1.2rem;
    padding-bottom: 1rem;
    background-color: #e1e1e1;
  }

  .comment_item {
    background: #fff;
  }

  .title_class {
    color: #666;
    font-size: 0.9rem;
    font-weight: 700;
    -webkit-box-flex: 0;
    -webkit-flex: 0;
    -ms-flex: 0;
    flex: 0;
  }

  .afterText_class {
    color: #08c;
    font-size: 0.9rem;
    margin-left: 5px;
  }

  .describeText_class{
    color: #333;
    font-size: 1rem;
  }

  .comment_container .mu-item-right{
    width: 70px;
    right: 0;
    -webkit-align-items: flex-start;
     align-items: flex-start;
  }

</style>
