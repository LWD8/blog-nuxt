<template>
  <section class="fuck">
    <div class="article">
      <article-view
        :articleList="list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></article-view>
    </div>
  </section>
</template>

<script>
const articleView = () => import('~/components/common/article')
export default {
  scrollToTop: true,

  head: {
    title: 'Fuck'
  },

  transition: 'fade',

  fetch({ store }) {
    return store.dispatch('REQ_getArtList', {
      type: 3,
      page:1,
      page_size: 2
    })
  },

  components: {
    articleView
  },

  computed: {
    list() {
      return this.$store.state.article.art.list
    },
    haveMoreArt() {
      return (
        this.$store.state.article.art.pagination.current_page !==
        this.$store.state.article.art.pagination.total_page
      )
    }
  },
  methods: {
    loadMore() {
      this.$store.dispatch('REQ_getArtList', {
        page: this.$store.state.article.art.pagination.current_page + 1,
        type: 3,
        page_size: 2
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fuck {
  > .title {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

    > .title-name {
      position: relative;
      padding-right: $lg-pad;
      background: $white;
      z-index: 99;
    }

    > .line {
      top: 50%;
    }
  }
}
</style>