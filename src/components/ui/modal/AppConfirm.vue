<template>
  <app-modal @close="$emit('reject')" :title="message">
    <app-button type="primary" @click="$emit('confirm')">Да</app-button>
    <app-button type="danger" @click="$emit('reject')">Нет</app-button>
  </app-modal>
</template>

<script>
import AppModal from '@/components/ui/modal/AppModal'
import AppButton from '@/components/ui/AppButton';
export default {
  emits: ['confirm','reject'],
  props: ['message'],
  components: {AppButton, AppModal}
}
</script>

<style scoped>

</style>