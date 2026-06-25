import { loadFromStorage, saveToStorage, removeFromStorage } from "./storage"
import { STORAGE_KEYS } from "./storageKeys"

export function loadHomeAddress(): string | undefined {
  return loadFromStorage<string | undefined>(STORAGE_KEYS.homeAddress, undefined)
}

export function saveHomeAddress(address: string): void {
  saveToStorage(STORAGE_KEYS.homeAddress, address)
}

export function removeHomeAddress(): void {
  removeFromStorage(STORAGE_KEYS.homeAddress)
}
