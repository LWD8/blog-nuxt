<template>
  <div class="app">
    <div class="app-main">
      <transition name="fade" mode="">
        <div class="head-box" v-if="!isWelcome">
          <my-header></my-header>
        </div>
      </transition>

      <transition-group
        tag="div" 
        class="container clearfix main-container" 
        name="slide-up" 
        :class="{ 'mobile': mobileLayout }">
        <div
            class="content-left" 
            key="1" 
            :class="{
              'full-page': !isAsdiePage,
              'mobile-layout': mobileLayout
            }">
          <nuxt/>
        </div>
      </transition-group>
      <transition name="fade" mode="">
        <my-footer v-if="!isError && !isWelcome"></my-footer>
      </transition>
    </div>
    <scroll-top></scroll-top>
  </div>
</template>
<script>
import MyHeader from '~/components/Layout/header'
import MyFooter from '~/components/Layout/footer'
import ScrollTop from '~/components/Layout/scrollTop'
export default {
  head () {
    return !this.mobileLayout ? {} : {
      bodyAttrs: {
        class: 'mobile'
      }
    }
  },
  components: {
    MyHeader,
    MyFooter,
    ScrollTop
  },
  computed: {
    isAsdiePage () {
      return this.$store.state.options.isAsidePage
    },

    isWelcome () {
      return this.$store.state.options.isWelcome
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    mobileSidebar () {
      return this.$store.state.options.mobileSidebar
    },

    isError () {
      return this.$store.state.options.isError
    }
  },
  mounted () {
    const theme = localStorage.getItem('THEME') || 'light'
    document.body.id = theme
  }
}
</script>

<style lang="scss" scoped>

.app {

  >.app-aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100%;
    width: 60%;
    background: $white;
    @include css3-prefix('transform', 'translateX(-100%)');
    @include transition(all .3s ease-out);

    >.mobile-aside {
      opacity: 0;
      @include transition(all .3s ease-out);
      @include css3-prefix('transform', 'scale(.8)');
    }
  }

  >.app-aside.open {
    @include css3-prefix('transform', 'translateX(0)');

    >.mobile-aside {
      opacity: 1;
      @include css3-prefix('transform', 'scale(1)');
    }
  }

  >.app-main {
    @include transition(all .3s ease-out);

    >.main-container {
      min-height: calc(100vh - 156px);
      margin-top: $normal-pad;
    }

    >.main-container.mobile {
      min-height: calc(100vh - 56px);
    }
  }

  >.app-main.open {
    transform: translateX(60%);
  }
}

.content-left {
  position: relative;
  width: $container-left;
  float: left;
  @include css3-prefix(transition, all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0));
}

.content-left.full-page,
.content-left.mobile-layout {
  width: 100%;
  @include css3-prefix(transition, width .5s cubic-bezier(1.0, 0.5, 0.8, 1.0));
}

.content-left.mobile-layout {
  width: 100%;
  margin: 0;
  padding: 1rem;
  padding-top: 4.5rem;
}

.content-right {
  width: $container-right;
  float: right;
}

.mobile {
  width: 100%;
}
</style>

