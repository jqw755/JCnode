<template>
  <div class="comment_container">
    <mu-sub-header style="color:#444;"><!--{{replies_.length}}-->回复</mu-sub-header>
    <div class="comment_item" v-for="(item,index) in replies_">
      <mu-list>
        <mu-list-item :title="item.author.loginname" titleClass="title_class" :afterText="String(index+1)+'楼'"
                      afterTextClass="afterText_class" :describeLine=Number(60)>
          <mu-avatar :src="item.author.avatar_url" slot="leftAvatar"/>
          <div slot="describe">
            <div class="describeText_class" v-html="item.content"></div>
          </div>
          <!--点赞-->
          <mu-badge slot="right"  badgeClass="badge_class"> <!--:content="String(item.ups.length)"-->
            <mu-icon value="thumb_up" :size="15" @click="ups(item.id)" :class='{uped:item.is_uped}'/>
            <span>{{item.ups.length}}</span>
          </mu-badge>
          <!--回复-->
          <mu-badge slot="right" badgeClass="badge_class">
            <mu-icon value="reply" :size="15"/>
          </mu-badge>
        </mu-list-item>
        <mu-divider inset/>
      </mu-list>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      replies_: {}
    },
    data() {
      return {}
    },
    methods:{
//    点赞
//    点赞需要获取对应评论的id,Vue的方法可以直接将对应的ID当做参数传递,很方便
      ups(id) {
        const self = this,
          eTarget = event.currentTarget,
//          NEXT = eTarget.nextSbiling,
          ACCESSTOKEN = self.$store.state.token;
        if (!ACCESSTOKEN) {
          const REDIRECT = 'article?topic_id=' + self.topic_id;
          self.$router.push('/login?redirect=' + REDIRECT);
          return;
        }
        self.axios({
          method: 'post',
          url: 'api/reply/'+id+'/ups',
          data: {
            'accesstoken': ACCESSTOKEN,
          }
        }).then((res) => {
          if (res.data.success === true) {
            console.log(res);
            if(res.data.action === 'up'){
//            这里采用js添加和删除类名实现点赞ICON的颜色切换,不符合Vue的精神,有待优化
              eTarget.className += " " + 'uped';
//            数字加减暂未实现
//              NEXT.innerHtml = parseInt(NEXT.innerHtml) + 1;
            }else if(res.data.action === 'down'){
//            这里采用js添加和删除类名实现点赞ICON的颜色切换,不符合Vue的精神,有待优化
              eTarget.className = eTarget.className.replace( new RegExp( "(\\s|^)" + 'uped' + "(\\s|$)" ), " " );
//            数字加减暂未实现
//              NEXT.innerHtml = parseInt(NEXT.innerHtml) - 1;
            }
          }
        }).catch((res) => {
          console.log(res);
          alert("error");
        });
      },
    },
    mounted(){}
  }
</script>

<style>
  .comment_container {
    margin-top:1.2rem;
    background-color: #f6f6f6;
  }

  .comment_item {
    background-color: #fff;
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

  .badge_class{
    width: 20px;
    top: 0;
    right: -16px;
    color: #666;
    padding: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: transparent;
  }

  .comment_container .mu-badge-container:first-child{
    margin-right: 18px;
  }

  .uped{
    color: red;
  }

</style>
