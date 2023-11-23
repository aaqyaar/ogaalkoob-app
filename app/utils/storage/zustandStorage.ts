import { MMKV } from "react-native-mmkv"
import { StateStorage } from "zustand/middleware"

export const storage = new MMKV({
  id: "root",
})

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return storage.getString(key) ?? null
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    storage.set(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<unknown | null> {
  try {
    const almostThere = storage.getString(key)
    return JSON.parse(almostThere ?? "")
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    storage.set(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Clear all keys from storage.
 * @returns
 */
export function clear(): boolean {
  try {
    storage.clearAll()
    return true
  } catch {
    return false
  }
}

/**
 * A zustand storage object that uses MMKV.
 *
 * @param key The key to fetch.
 */
export const zustandStorage: StateStorage = {
  getItem: (key) => {
    const value = storage.getString(key)
    return value ?? null
  },
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
}
