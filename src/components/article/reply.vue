<template>
    <div class="reply_container clear_fix">
        <mu-sub-header style="color:#444;background-color: #f6f6f6">添加回复</mu-sub-header>
        <vue-editor v-model="content"></vue-editor>
        <mu-raised-button label="发表" class="save_btn" @click="saveContent(for_reply_id)"/>

        <section class="toast">
            <mu-toast v-if="toast" :message="toast_msg" @close="hideToast" class="topic_toase"/>
        </section>
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor'
    import {loading} from '../../utils/loading'
    export default {
        props:{
            for_reply_id:''
        },
        data() {
            return {
                content: '',
                toast: false,
                toast_msg: '',
                dialog: false,
            }
        },
        methods: {
//          toast方法
            showToast () {
                this.toast = true;
                if (this.toastTimer) clearTimeout(this.toastTimer);
                this.toastTimer = setTimeout(() => {
                    this.toast = false;
                }, 2800);

            },
            hideToast () {
                this.toast = false;
                if (this.toastTimer) clearTimeout(this.toastTimer);
            },
            //回复文章后记录当前位置
            setScroll(){
                //关于If、else的区别,因为某些浏览器的支持问题
                let set_top;
                if (document.documentElement &&
                    document.documentElement.scrollTop) {
                    set_top = document.documentElement.scrollTop;
                } else if (document.body) {
                    set_top = document.body.scrollTop;
                }
                sessionStorage.setItem('scrollTop_val', set_top);
            },
//          加载后获取记录的位置,如果有的话
            getScroll(){
                let get_top = parseInt(sessionStorage.getItem('scrollTop_val'));
                if (get_top !== 0) {
                    if (document.documentElement &&
                        document.documentElement.scrollTop) {
                        document.documentElement.scrollTop = get_top;
                    } else if (document.body) {
                        document.body.scrollTop = get_top;
                    }
                }
            },
            saveContent(reply_id) {
                console.log(reply_id);
                let params_ = {};
                if (reply_id !== 1) {
                    params_ = {
                        'accesstoken': this.$store.state.token,
                        'content': this.content,
                        'reply_id': reply_id
                    };
                    console.log('评论回复');
                    console.log(params_);
                } else {
                    params_ = {
                        'accesstoken': this.$store.state.token,
                        'content': this.content,
                    };
                    console.log('文章回复');
                    console.log(params_);
                }

                //      未填写内容
                const parten = /^\s*$/;
                let is_kong = parten.test(this.content);
                if (this.content === '' || is_kong) {
                    this.toast_msg = '还没有填写内容哦 😯 !';
                    this.showToast();
                }
                console.log(this.content)
//                return false;
                if (this.$store.state.token) {
                    loading.show();
                    this.axios({
                        method: 'post',
                        url: 'api/topic/' + this.$route.query.topic_id + '/replies',
                        data: params_,
                    }).then((res) => {
                        loading.hide();
                        if (res.data.success === true) {
//                            console.log(res);
                            this.toast_msg = '发表成功 😁 !';
                            this.showToast();
                            this.setScroll();
                            setTimeout(() => {
                                window.location.reload();
                            }, 800);
                        } else {
                            this.toast_msg = '发表失败 😔 !';
                            this.showToast();
                            console.log(res);
                        }
                    }).catch((res) => {
                        loading.hide();
                        console.log(res);
                        alert("error");
                    });
                } else {
                    this.toast_msg = '没有token哦 😯 !';
                    this.showToast();
                    return false;
                }
            },
            close () {
                this.dialog = false
            },
        },
        mounted() {
            this.getScroll();
        },
        components: {
            VueEditor,
        },
    }
</script>

<style>
    .reply_container #quill-container {
        height: 250px;
    }

    .save_btn,
    .cancel_btn {
        margin: 10px 10px 0 0;
        background: dodgerblue;
        color: #fff;
        float: right;
    }

</style>
