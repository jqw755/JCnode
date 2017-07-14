<template>
    <div class="my_topic">
        <loading_v></loading_v>
        <mu-sub-header>我参与的回复</mu-sub-header>
        <context :contents="data.recent_replies"></context>
    </div>
</template>

<script>
    import loading_v from '../../loading/loading'
    import {loading} from '../../../utils/loading'
    import context from '../../home/context'
    export default {
        data() {
            return {
                data: {},
                userinfo: {},
            }
        },
        methods: {
            getMy(){
                const USERINFO = JSON.parse(localStorage.getItem('user'));
                if (USERINFO) {
                    this.userinfo = USERINFO;
                } else {
                    this.$router.push('/login');
                }
                this.axios.get('api/user/' + this.userinfo.loginname).then((response) => {
                    if (response.data.success === true) {
                        this.data = response.data.data;
                        loading.hide();
//                        console.log(response)
                    }
                }).catch(res => {
                    console.log(res);
                    alert('请求出错');
                });
            },
        },
        mounted() {
            this.getMy();
        },
        components: {
            loading_v,
            context
        }
    }
</script>

<style>
    .mu-item-right .material-icons {
        color: #f13a11;
    }

</style>