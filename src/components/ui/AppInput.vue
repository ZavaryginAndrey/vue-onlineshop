<template>
  <div :class="['form-control']">
    <label :for="type">{{ label }}</label>
    <input type="text" :id="type" v-model="value">
    <!--      <small if v-if="fioError">{{fioError}}</small>-->
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue';

export default {
  emits: ['update:modelValue'],
  props: ['modelValue', 'label'],
  setup(_, {emit}) {
    const value = ref()

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