<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Вернуться к списку продуктов</router-link>
  </div>
  <div :class="['card', {center}]">
    <h1 class="card-title" v-if="title">{{title}}
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
    },
    center: {
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