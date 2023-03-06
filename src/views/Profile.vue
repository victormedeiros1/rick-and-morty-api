<script lang="ts">
import axios from 'axios'
import ButtonBack from '@/components/ButtonBack.vue'
import type { Character } from '@/types/characters'

const query = `
  query($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
      episode {
        id
        name
      }
    }
  }`

interface Data {
  character: Character
  loading: boolean
  error: boolean
}

export default {
  name: 'Profile',
  components: {
    ButtonBack
  },

  data(): Data {
    return {
      character: {
        id: '',
        name: '',
        status: '',
        species: '',
        gender: '',
        image: '',
        episode: []
      },
      loading: true,
      error: false
    }
  },

  mounted() {
    this.getCharacter()
  },

  methods: {
    async getCharacter() {
      try {
        const id = this.$route.params.id
        const result = await axios.post('https://rickandmortyapi.com/graphql', {
          query,
          variables: {
            id
          }
        })
        this.character = result.data.data.character
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <section>
    <div class="characters-list flex row q-gutter-lg">
      <ButtonBack />
      <Loading v-if="loading" />

      <q-card class="bg-transparent text-white shadow-3">
        <q-card-section class="q-pb-none">
          <img :src="character.image" loading="lazy" />
        </q-card-section>

        <q-card-section class="q-pb-none">
          <h1 class="text-h6">{{ character.name }}</h1>
        </q-card-section>

        <q-card-section class="q-py-none">
          <span>Status: {{ character.status }}</span>
        </q-card-section>
        <q-card-section class="q-py-none">
          <span>Gênero: {{ character.gender }}</span>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <span>Espécie: {{ character.species }}</span>
        </q-card-section>

        <q-card-section>
          <q-list dense bordered padding class="rounded-borders">
            <q-item>
              <p class="text-h6">Aparições (episódios)</p>
            </q-item>
            <q-item v-for="{ id, name } in character.episode" :key="id">
              <q-item-section> {{ name }} </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>
