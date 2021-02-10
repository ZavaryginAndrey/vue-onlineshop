<template>
  <div class="pagination">
    <a href="#">&laquo;</a>
    <a href="#" :class="{active: activePage === p}" v-for="p in pages">{{ p }}</a>
    <a href="#">&raquo;</a>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'

export default {
  emits: ['pageChange'],
  props: ['data', 'itemsOnPage'],
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const pages = [1,2,3,4,5]

    props.data.splice()

    return {
      activePage: computed(() => route.query.page),
      pages,
      newPage(id) {
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