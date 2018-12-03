<template>
  <div>
    <nuxt-link to="/code">码农</nuxt-link>  
    <nuxt-link to="/think">读书</nuxt-link>  
    <nuxt-link to="/fuck">民谣</nuxt-link>
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
  }
}
</script>
