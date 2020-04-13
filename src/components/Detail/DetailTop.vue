<template>
    <div class="detail-top">
      <img :src="path" alt="">
      <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    changeMask (data) {
      this.$refs.mask.style.opacity = data
    }
  }
}
</script>

<style scoped lang="scss">
.detail-top{
  height: 500px;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 23;

  .mask{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #000;
    opacity: 0;
  }
  img{
    width: 100%;
  }
}
</style>
