<template>
  <div class="loading fixed flex flex-center">
    <img class="loading__logo" src="@/assets/images/rickandmorty.png" />
  </div>
</template>

<style lang="scss" scoped>
.loading {
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);

  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  &__logo {
    position: relative;
    max-width: 629px;
    animation: loading 1s infinite alternate;
  }

  @keyframes loading {
    0% {
      filter: drop-shadow(0 0 8px #fff);
    }
    100% {
      filter: drop-shadow(0 0 20px #fff);
    }
  }
}
</style>
