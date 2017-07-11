<template>
  <div class="tab_context">
    <loading_v></loading_v>

    <home_context :contents='data'></home_context>
  </div>
</template>

<script>
  import loading_v from '../../loading/loading'
  import {loading} from '../../../utils/loading'
  import home_context from '../../home/context'
  export default {
    props: {
      tab: ''
    },
    data() {
      return {
        data: {}
      }
    },
    methods: {
      getTabData(type){
        this.axios.get('api/topics?tab=' + type + '&limit=8').then((response) => {
          if (response.data.success === true) {
            loading.hide();
            this.data = response.data.data;
          }
        }).catch(response => {
          console.log(response);
          alert('请求出错');
        });
      },
    },
    components: {
      loading_v,
      home_context
    },
    //watch监听,里面的对象都是已经定义好的变量,用于实时监听变量的改变在触发事件,这个tab(newVal)就等于prpos里的tab
    //computed计算属性,里面定义方法,是返回变量,不返回方法的
    watch: {
      tab(newVal){
        loading.show();
        this.getTabData(newVal);
      }
    }
  }
</script>

<style>


</style>
