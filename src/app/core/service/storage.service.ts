import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  /**
   * Set item to local storage
   * @param key
   * @param value
   * @example setItem(Storage.STACK, data)
   */
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get item from local storage
   * @param key
   * @example getItem(Storage.STACK)
   * @returns {any}
   */
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }
}
