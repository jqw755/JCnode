<template>
    <div class="message_container">
        <loading_v></loading_v>

        <section class="has_read">
            <mu-sub-header class="head_tip">新消息</mu-sub-header>
            <mu-list class="message_content">
                <div class="message_none" v-if="hasnot_read_messages.length === 0">
                    无消息
                </div>
                <div class="" v-if="is_mark_all">
                    <p style="padding-left: 1rem;" v-if="hasnot_read_messages.length !== 0" @click="markAll">全部标记为已读</p>
                    <div v-for="hasnot in hasnot_read_messages">
                        <mu-list-item :to="`/article?topic_id=` + hasnot.topic.id">
                            <span slot="leftAvatar">{{hasnot.author.loginname}}</span>
                            <span>{{hasnot.type}}了你的话题:</span>
                            <span>
                            <router-link :to="`/article?topic_id=` + hasnot.topic.id">
                              {{hasnot.topic.title}}
                            </router-link>
                        </span>
                        </mu-list-item>
                    </div>
                </div>
            </mu-list>
        </section>

        <section class="has_not_read">
            <mu-sub-header class="head_tip">历史消息</mu-sub-header>
            <mu-list class="message_content">
                <div v-for="has in has_read_messages">
                    <mu-list-item title="">
                        <span slot="leftAvatar">{{has.author.loginname}}</span>
                        <span>{{has.type}}了你的话题:</span>
                        <span>
                            <router-link :to="`/article?topic_id=` + has.topic.id">
                              {{has.topic.title}}
                            </router-link>
                        </span>
                    </mu-list-item>
                </div>
            </mu-list>
        </section>
    </div>
</template>

<script>
    import loading_v from '../loading/loading'
    import {loading} from '../../utils/loading'
    export default {
        data() {
            return {
                is_mark_all:true,
                has_read_messages: {},
                hasnot_read_messages: {}
            }
        },
        methods: {
            getMessage(){
                loading.show();
                this.axios.get('api/messages?accesstoken=' + this.$store.state.token).then((res) => {
                    loading.hide();
                    if (res.data.success === true) {
                        this.has_read_messages = res.data.data.has_read_messages;
                        this.hasnot_read_messages = res.data.data.hasnot_read_messages;
//                        console.log(res);
                    }
                }).catch(res => {
                    loading.hide();
                    console.log(res);
                    alert('请求出错');
                });
            },
            markAll(){
                loading.show();
                const ACCESSTOKEN = this.$store.state.token;
                if (ACCESSTOKEN) {
                    this.axios({method: 'post', url: 'api/message/mark_all', data: {'accesstoken': ACCESSTOKEN}})
                        .then((res) => {
                            loading.hide();
                            if (res.data.success === true) {
                                console.log(res);
                                this.is_mark_all = false;
                            }
                        }).catch((res) => {
                        loading.hide();
                        console.log(res);
                    });
                } else {
                    alert('token呢');
                }
            },
        },
        mounted() {
            this.getMessage();

        },
        components: {
            loading_v
        }
    }
</script>

<style>
    .message_container {
        background-color: #e1e1e1;
    }

    .message_none {
        padding: 0 1rem 1rem 1rem;
    }

    .has_read {
        margin-bottom: 1rem;
    }

    .head_tip {
        background: #f6f6f6;
    }

    .message_content {
        background: #fff;
    }

</style>