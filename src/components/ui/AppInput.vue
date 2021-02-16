<template>
  <div :class="['form-control', {invalid: error}]">
    <label :for="id">{{ label }}</label>
    <input :type="type || 'text'" :id="id" v-model="value" @blur="blur">
    <small v-if="error">{{error}}</small>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue', 'label', 'error', 'blur', 'type'],
  setup(props, {emit}) {
    const value = ref(props.modelValue)

    watch(value, v => {
      emit('update:modelValue', v)
    })

    return {
      value,
      id: computed(() => 'input' + Math.random())
    }
  }
}
</script>

<style scoped>

</style>