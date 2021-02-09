<template>
  <button
    :class="['btn', type]"
    :disabled="disabled"
    @click="$emit('action')"
  >
    {{text}}
  </button>
</template>

<script>
export default {
  emits: ['action'],
  props: ['disabled', 'type', 'text']
}
</script>

<style scoped>

</style>