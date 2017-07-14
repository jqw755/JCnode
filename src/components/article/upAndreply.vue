<template>
  <div class="U_R">
    <!--点赞-->
    <mu-badge slot="right" :content="String(item.ups.length)" badgeClass="badge_class"> <!---->
      <mu-icon value="thumb_up" :size="15" @click="ups(item.id)" :class='{uped:item.is_uped}'/>
      <!--<span>{{item.ups.length}}</span>-->
    </mu-badge>
    <!--回复-->
    <mu-badge slot="right" badgeClass="badge_class">
      <mu-icon value="reply" :size="15"/>
    </mu-badge>
  </div>
</template>

<script>
  export default {
    props: {
      item: {}
    },
    data() {
      return {}
    },
    methods: {
//    点赞
//    点赞需要获取对应评论的id,Vue的方法可以直接将对应的ID当做参数传递,很方便
      ups(id) {
        const self = this,
//          当前点击元素(返回对象)
          eTarget = window.event.srcElement || window.event.target,
//          当前点击元素的下个兄弟元素(返回对象)
          eTargetCount = eTarget.parentNode.childNodes[2],
          ACCESSTOKEN = self.$store.state.token;
        if (!ACCESSTOKEN) {
          const REDIRECT = 'article?topic_id=' + self.topic_id;
          self.$router.push('/login?redirect=' + REDIRECT);
          return;
        }
        self.axios({
          method: 'post',
          url: 'api/reply/' + id + '/ups',
          data: {
            'accesstoken': ACCESSTOKEN,
          }
        }).then((res) => {
          if (res.data.success === true) {
            console.log(res);
            if (res.data.action === 'up') {
//            这里用js添加和删除类名实现点赞ICON的颜色切换和数字加减,不符合Vue的精神,有待优化
              eTarget.className += " " + 'uped';
              eTargetCount.innerText = parseInt(eTargetCount.innerText) + 1;
            } else if (res.data.action === 'down') {
//            这里用js添加和删除类名实现点赞ICON的颜色切换和数字加减,不符合Vue的精神,有待优化
              eTarget.className = eTarget.className.replace(new RegExp("(\\s|^)" + 'uped' + "(\\s|$)"), " ");
              eTargetCount.innerText = parseInt(eTargetCount.innerText) - 1;
            }
          }
        }).catch((res) => {
          console.log(res);
          alert("error");
        });
      },

//     回复
      reply(){

      }
    },
  }
</script>

<style>
  .U_R{
    display: inline-block;
    position: absolute;
    right: 16px;
    top: 12px;
  }

  .badge_class {
    width: 20px;
    top: 0;
    right: -16px;
    color: #666;
    padding: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: transparent;
  }

  .comment_container .mu-badge-container:first-child {
    margin-right: 18px;
  }

  .uped {
    color: red;
  }

</style>
