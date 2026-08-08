import { create } from 'zustand';

interface FavoritesState {
  ids: string[];
  setIds: (ids: string[]) => void;
  addId: (id: string) => void;
  removeId: (id: string) => void;
  clearIds: () => void;
}

export const useFavoritesStore = create<FavoritesState>(set => ({
  ids: [],
  setIds: ids => set({ ids }),
  addId: id => set(state => ({ ids: [...state.ids, id] })),
  removeId: id =>
    set(state => ({ ids: state.ids.filter(item => item !== id) })),
  clearIds: () => set({ ids: [] }),
}));
