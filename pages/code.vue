<template>
  <section class="clearfix main">
    <div class="article">
      <article-view
        :articleList="list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></article-view>
    </div>
  </section>
</template>

<script>
import articleView from '~/components/common/article'
export default {
  scrollToTop: true,

  transition: 'fade',

  fetch({ store }) {
    return store.dispatch('REQ_getArtList', {
      type: 1,
      page:1,
      page_size: 2
    })
  },

  components: {
    articleView
  },
  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout
    },

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
    loadMore () {
      this.$store.dispatch('REQ_getArtList', {
        type: 1,
        page: this.$store.state.article.art.pagination.current_page + 1,
        page_size: 2
      })
    }
  }
}
</script>
