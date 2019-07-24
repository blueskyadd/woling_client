<template>
    <mu-container ref="container" class="demo-loadmore-content">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" :loaded-all='isLoaded'>
            <slot></slot>
        </mu-load-more>
    </mu-container>
</template>

<script>

export default {
  props: {
      num: 10,
      refreshing: false,
      loading: false,
      text: 'List'
  },
  data () {
    return {

    }
  },
  methods: {
    refresh () {
        console.log('下拉刷新')
    },
    load () {
        console.log('上拉加载')
    }
  }
}

</script>

<style scoped lang="scss">
.demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
  .mu-appbar {
    width: 100%;
  }
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
