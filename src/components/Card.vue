<script lang="ts">
import type { Character } from '@/types/characters'

export default {
  name: 'Card',
  props: {
    character: { type: Object as () => Character, default: () => {} },
    loading: { type: Boolean, default: true }
  }
}
</script>

<template>
  <q-card class="card bg-transparent text-white shadow-3">
    <q-card-section class="q-pb-none">
      <img class="card__image" :src="character.image" loading="lazy " />
      <div v-if="loading" class="loading-image"></div>
      <div v-if="character.status === 'Dead'" class="x-dead"></div>
    </q-card-section>

    <q-card-section class="q-pb-none">
      <h1 class="text-h6">{{ character.name }}</h1>
    </q-card-section>

    <q-card-section class="q-pt-none"
      ><span> Status: {{ character.status }} </span></q-card-section
    >

    <q-card-section v-if="character.episode">
      <q-list dense bordered padding class="rounded-borders">
        <q-item>
          <p class="text-h6">Aparições (episódios)</p>
        </q-item>
        <q-item v-for="{ id, name } in character.episode" :key="id">
          <q-item-section> # {{ name }} </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.loading-image {
  top: 1rem;
  left: 1rem;
  z-index: 2;
  width: 18.75rem;
  height: 18.75rem;
  background-color: white;
  position: absolute;
}
.card {
  position: relative;
  max-width: 20.75rem;

  &__image {
    width: 18.75rem;
    height: 18.75rem;
  }
}
.x-dead {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after,
  &::before {
    content: '';
    position: absolute;
    width: 1.875rem;
    height: 100%;
    background-color: rgba(#9c1000, 50%);
  }

  &::after {
    transform: rotate(-45deg);
  }
  &::before {
    transform: rotate(45deg);
  }
}
</style>
