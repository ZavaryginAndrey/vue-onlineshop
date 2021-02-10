<template>
  <button
    :class="['btn', type]"
    :disabled="disabled"
    @click="$emit('action')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  emits: ['action'],
  props: ['disabled', 'type']
}
</script>

<style scoped>

</style>