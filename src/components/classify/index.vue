<template>
  <div class="classify">
    <section class="classify_tab">
      <mu-tabs :value="activeTab" @change="handleTabChange" lineClass="lineClass" class="head_tab">
        <mu-tab value="good" titleClass="titleClass" title="精华"/>
        <mu-tab value="ask" titleClass="titleClass" title="问答"/>
        <mu-tab value="share" titleClass="titleClass" title="分享"/>
        <mu-tab value="job" titleClass="titleClass" title="招聘" @active="handleActive"/>
        <mu-tab value="dev" titleClass="titleClass" title="客户端测试"/>
      </mu-tabs>
    </section>

    <section class="tab_container">
      <classifyDetail :tab="indexChangeTab"></classifyDetail>
    </section>
  </div>
</template>

<script>
  import classifyDetail from './classifies/classifyDetail'
  export default {
    data() {
      return {
        activeTab: '',
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val;
      },
      handleActive () {
//        console.log(this.activeTab + '被选中');
      },
    },
    components: {
      classifyDetail,
    },
    mounted(){
      this.activeTab = 'good';
    },
    computed: {
      indexChangeTab(){
        return this.activeTab;
      },
    }
  }
</script>

<style>
  .head_tab {
    background-color: #f6f6f6;
  }

  .mu-tab-active {
    background-color: #322e35;
  }

  .titleClass {
    color: #80bd01;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>
