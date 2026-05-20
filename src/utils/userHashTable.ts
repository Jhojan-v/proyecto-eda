import type { UserProfile } from '../firebase/userProfiles'

export class UserHashTable {
  private buckets: UserProfile[][]

  constructor(initialUsers: UserProfile[] = [], size = 31) {
    this.buckets = Array.from({ length: size }, () => [])
    initialUsers.forEach((user) => this.set(user))
  }

  private hash(email: string) {
    return [...email.toLowerCase()].reduce(
      (total, char) => (total * 31 + char.charCodeAt(0)) % this.buckets.length,
      0,
    )
  }

  set(user: UserProfile) {
    const index = this.hash(user.email)
    const normalizedEmail = user.email.toLowerCase()
    const existingIndex = this.buckets[index].findIndex(
      (item) => item.email.toLowerCase() === normalizedEmail,
    )

    if (existingIndex >= 0) {
      this.buckets[index][existingIndex] = user
      return
    }

    this.buckets[index].push(user)
  }

  get(email: string) {
    const index = this.hash(email)
    return (
      this.buckets[index].find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null
    )
  }
}
