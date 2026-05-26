import { collection, getDocs, onSnapshot, query } from 'firebase/firestore'
import { db } from '../config/firebase'
import type { Game } from '../types'

const gamesCollection = collection(db, 'games')

export async function getGamesFromFirestore(): Promise<Game[]> {
  const querySnapshot = await getDocs(gamesCollection)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Game, 'id'>),
  }))
}

export function subscribeToGames(onUpdate: (games: Game[]) => void) {
  const q = query(gamesCollection)
  return onSnapshot(q, (querySnapshot) => {
    const gamesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Game, 'id'>),
    }))
    onUpdate(gamesList)
  })
}