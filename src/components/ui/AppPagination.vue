<template>
  <div class="pagination">
    <button
      class="btn"
      :disabled="modelValue === 1"
      @click="$emit('update:modelValue', modelValue-1)"
    >
      &laquo;
    </button>
    <button
      class="btn"
      v-for="p in pages"
      :class="{active: p === modelValue}"
      @click="$emit('update:modelValue', p)"
    >
      {{ p }}
    </button>
    <button
      class="btn"
      :disabled="modelValue === pages"
      @click="$emit('update:modelValue', modelValue+1)"
    >
      &raquo;
    </button>
  </div>
</template>

<script>
import {computed} from 'vue'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue', 'pageSize', 'itemsCount'],
  setup(props) {
    return {
      pages: computed(() => Math.ceil(props.itemsCount / props.pageSize))
    }
  }
}

</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}

.pagination .btn {
  color: black;
  padding: 8px 16px;
  background: #eaecef;
  border: none;
  border-radius: 10px;
}

.pagination .btn.active {
  background: #3eaf7c;
  color: white;
}
.pagination .btn:hover:not(.active) {
  background-color: #cccccc;
}
</style>