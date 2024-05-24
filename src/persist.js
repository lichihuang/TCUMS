// pinia 持久化
import { createPersistedState } from 'pinia-plugin-persistedstate';

export const createPersistPlugin = () => {
  return createPersistedState({
    storage: sessionStorage,
  });
};
