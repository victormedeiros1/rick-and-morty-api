export interface Episode {
  id: string
  name: string
}

export interface Character {
  id: string
  name: string
  status: string
  image: string
  species?: string
  gender?: string
  episode?: Episode[]
}
