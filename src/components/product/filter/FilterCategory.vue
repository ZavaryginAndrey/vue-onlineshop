<template>
  <li :class="['list-item', {active}]" @click="$emit('categoryChose')">{{ text }}</li>
</template>

<script>
export default {
  props: ['text', 'active'],
}
</script>

<style scoped>

</style>