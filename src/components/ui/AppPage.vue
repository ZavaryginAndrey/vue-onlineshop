<template>
  <div class="card">
    <h1 class="card-title">{{title}}
      <slot name="header"></slot>
    </h1>
    <slot/>
  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Магазинчик`
  }
}
</script>

<style scoped>

</style>