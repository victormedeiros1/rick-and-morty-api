<script lang="ts">
export default {
  name: 'ButtonBack'
}
</script>
<template>
  <RouterLink to="/">
    <q-btn class="button-back" color="accent" label="Voltar" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.button-back {
  position: fixed;
  top: 1rem;
  left: 1rem;
}
</style>
