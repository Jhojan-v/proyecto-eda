import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { games as localGames } from '../data/games' // Tus datos estáticos actuales

/**
 * Recorre el arreglo local e inserta o actualiza cada juego en tu Firestore
 */
export async function migrateCatalogToFirestore(): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const gamesCollection = collection(db, 'games')
    let migratedCount = 0

    for (const game of localGames) {
      // Usamos el mismo ID que ya definiste (ej: 'game_01') como identificador del documento
      const docRef = doc(gamesCollection, game.id)
      
      // Separamos el ID del resto de los datos para no duplicarlo dentro del objeto NoSQL
      const { id, ...gameData } = game

      // setDoc crea el documento si no existe, o lo sobrescribe con tus datos limpios
      await setDoc(docRef, gameData)
      migratedCount++
    }

    return { success: true, count: migratedCount }
  } catch (error: any) {
    console.error('Error en la migración:', error)
    return { success: false, count: 0, error: error.message ?? 'Error desconocido' }
  }
}