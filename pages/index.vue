<template>
  <div>
    <div id="particles"></div>
    <div class="nav_box">
      <nuxt-link to="/code">码农</nuxt-link>  
      <nuxt-link to="/think">读书</nuxt-link>  
      <nuxt-link to="/fuck">民谣</nuxt-link>
    </div>
    <!-- {{ userAgent }}
    {{ mobileLayout }} -->
  </div>
</template>
<script>
export default {
  computed: {
    userAgent() {
      return this.$store.state.options.userAgent
    },
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    }
  },
  mounted () {
    // 粒子效果
    if (process.client) {
      require('particles.js')
    }
    particlesJS.load('particles', '/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }
}
</script>

<style lang="scss">
#particles{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
}
.nav_box{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  min-width: 150px;
  z-index: 10;
}
</style>

