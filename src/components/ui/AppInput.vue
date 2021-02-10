<template>
  <div :class="['form-control', {invalid: error}]">
    <label :for="type">{{ label }}</label>
    <input type="text" :id="type" v-model="value" @blur="blur">
    <small if v-if="error">{{error}}</small>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue', 'label', 'error', 'blur'],
  setup(props, {emit}) {
    const value = ref(props.modelValue)

    watch(value, v => {
      emit('update:modelValue', v)
    })

    return {
      value,
      type: computed(() => 'input' + Math.random())
    }
  }
}
</script>

<style scoped>

</style>