<template>
  <slot name="header"/>
  <div class="pagination">
    <a v-for="(_, idx) in pages"
       href="#"
       @click="newPage(idx + 1)"
    >{{ idx+1 }}
    </a>
  </div>
  <slot />
</template>

<script>
import {computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {pageCount} from '@/utils/pagination'

export default {
  emits: ['pageChange'],
  props: ['data', 'pageSize'],
  setup(props, {emit}) {
    const router = useRouter()
    const route = useRoute()


    const pagesCount = computed(() => pageCount(props.data, props.pageSize))

    return {
      activePage: computed(() => route.query.page),
      pages: new Array(pagesCount.value),
      newPage(id) {
        emit('pageChange', id)
        router.replace({query: {page: id}})
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;

}

.pagination a.active {
  background: #3eaf7c;
  border-radius: 50%;
  color: white;
}
.pagination a:hover:not(.active) {
  background-color: #ddd;
  border-radius: 50%;
}

</style>