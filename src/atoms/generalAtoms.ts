import { atom, AtomEffect, DefaultValue } from 'recoil';

const pageSizeKey = 'pageSize';

const localStorageEffect = <T>(key: string): AtomEffect<T> => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet(newValue => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

export const pageSizeAtom = atom<number>({
  key: 'pageSize',
  default: 7,
  effects_UNSTABLE: [localStorageEffect(pageSizeKey)]
});
