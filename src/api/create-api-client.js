import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'

export function createAPI({ config, version }) {
  const app = initializeApp(config)
  const database = getDatabase(app)
  return ref(database, version)
}
