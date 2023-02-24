import { decrypt, encrypt } from '@/utils/crypto';

export function setSession(key: string, value: unknown) {
  const json = encrypt(value);
  sessionStorage.setItem(key, json);
}

export function getSession<T>(key: string) {
  const json = sessionStorage.getItem(key);
  let data: T | null = null;
  if (json) {
    try {
      data = decrypt(json);
    } catch {
      // 防止解析失败
    }
  }
  return data;
}

export function removeSession(key: string) {
  window.sessionStorage.removeItem(key);
}

export function clearSession() {
  window.sessionStorage.clear();
}

function createSessionStorage<T extends StorageInterface.Session = StorageInterface.Session>() {
  function set<K extends keyof T>(key: K, value: T[K]) {
    const json = encrypt(value);
    sessionStorage.setItem(key as string, json);
  }
  function get<K extends keyof T>(key: K) {
    const json = sessionStorage.getItem(key as string);
    let data: T[K] | null = null;
    if (json) {
      try {
        data = decrypt(json);
      } catch {
        // 防止解析失败
      }
    }
    return data;
  }
  function remove(key: keyof T) {
    window.sessionStorage.removeItem(key as string);
  }
  function clear() {
    window.sessionStorage.clear();
  }
  return {
    set,
    get,
    remove,
    clear
  };
}

export const sessionStg = createSessionStorage();
