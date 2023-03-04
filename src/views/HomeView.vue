<script lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const GET_CHARACTERS = gql`
  query Characters {
    characters {
      results {
        id
        name
        status
        image
      }
    }
  }
`

interface Character {
  id: string
  name: string
  status: string
  image: string
}

interface Data {
  text: string
  characters: Character[]
}

export default {
  name: 'HomeView',
  data(): Data {
    return {
      text: '',
      characters: []
    }
  },
  setup() {
    const { result, loading, error } = useQuery(GET_CHARACTERS)

    return {
      result,
      loading,
      error
    }
  }
}
</script>

<template>
  <section>
    <header>
      <q-input outlined v-model="text" type="text" label="Procure por um personagem" />
      {{ text }}
    </header>

    <div class="characters-list flex row q-gutter-lg">
      <q-spinner-cube v-if="loading" color="color-primary-main" size="2rem" />

      <q-card
        class="bg-secondary text-white"
        v-else
        v-for="character in result.characters.results"
        :key="character.id"
      >
        <q-card-section>
          <img :src="character.image" />
          <div class="text-h6">{{ character.name }}</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section> Status: {{ character.status }} </q-card-section>
        <RouterLink :to="`/character/${character.id}`"> Mais informações </RouterLink>
      </q-card>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
