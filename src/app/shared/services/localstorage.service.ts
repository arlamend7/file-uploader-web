import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    set(key: string, value: string): boolean {
       return this.try(() => this.storage.setItem(key, value));
    }

    get(key: string): { data: string, success: boolean } {
        const value = this.storage.getItem(key);
        if (value) {
            return { data: value, success: true };
        }
        return { data: null, success: false };
    }

    remove(key: string): boolean {
       return this.try(() => this.storage.removeItem(key));
    }

    clear(): boolean {
        return this.try(() => this.storage.clear());
    }

    private try(func: () => void) {
        if (this.storage) {
            func();
            return true;
        }
        return false;
    }
}
