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
    getItem(key: string): any {
        return JSON.parse(localStorage.getItem(key) || "[]");
    }

    /**
     * Check if object are equal
     * @param arr1
     * @param arr2
     * @param keysToIgnore
     * @example checkObjectsAreEqual(old, new)
     * @returns {boolean} true if objects are equal
     */
    checkObjectsAreEqual(arr1: any[], arr2: any[], keysToIgnore: string[] = []): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            const obj1 = arr1[i];
            const obj2 = arr2[i];

            const keys1 = Object.keys(obj1).filter(key => !keysToIgnore.includes(key));
            const keys2 = Object.keys(obj2).filter(key => !keysToIgnore.includes(key));

            if (keys1.length !== keys2.length) {
                return false;
            }

            for (const key of keys1) {
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }
        }

        return true;
    }
}
