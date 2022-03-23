<template>
    <div class="v-notification">
        <transition-group name="animate" tag="span">
            <div class="v-notification__content" v-for="message in messages" :key="message.id">
                <div class="content__text">
                    <span>{{message.name}}</span>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: 'v-notification',
        props: {
            messages: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            hideNotification() {
                let vm = this;
                if (this.messages.length > 0) {
                    setTimeout(function() {
                        vm.messages.splice(vm.messages.length - 1, 1)
                    }, 500)
                }
            }
        },
        watch: {
            messages: {
                handler: function () {
                    this.hideNotification()
                },
                deep: true
            },
        },
        mounted() {
            this.hideNotification()
        }
    }
</script>

<style lang="scss">
    .v-notification {
        position: fixed;
        top: 80px;
        right: 16px;
        z-index: 10;
        &__content {
            padding: 16px;
            border-radius: 4px;
            color: azure;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            margin-bottom: 16px;
            background: green;
        }
        .content {
            &__text {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
    .animate {
        &-enter {
            transform: translateX(120px);
            opacity: 0;
        }
        &-enter-active {
            transition: all .6s ease;
        }
        &-enter-to {
            opacity: 1;
        }
        &-leave {
            height: 50px;
            opacity: 1;
        }
        &-leave-active {
            transition: transform .6s ease, opacity .6s, height .6s .2s;
        }
        &-leave-to {
            height: 0;
            transform: translateX(120px);
            opacity: 0;
        }
        &-move {
            transition: transform .6s ease;
        }
    }
</style>