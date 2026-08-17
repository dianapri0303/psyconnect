import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';
import { Psychologist } from '@/types/psychologist';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useAuthStore } from '@/store/authStore';

export function useFavoritesList() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data } = await api.get<Psychologist[]>('/api/favorites');
      return data;
    },
    enabled: isLoggedIn,
    staleTime: 0,
  });
}

interface ToggleParams {
  id: string;
  isFavorite: boolean;
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { addId, removeId } = useFavoritesStore();

  return useMutation({
    mutationFn: async ({ id, isFavorite }: ToggleParams) => {
      if (isFavorite) {
        await api.delete(`/api/favorites/${id}`);
      } else {
        await api.post(`/api/favorites/${id}`, {});
      }
    },
    onMutate: ({ id, isFavorite }: ToggleParams) => {
      if (isFavorite) {
        removeId(id);
      } else {
        addId(id);
      }
    },
    onError: (_error, { id, isFavorite }) => {
      if (isFavorite) {
        addId(id);
      } else {
        removeId(id);
      }
      toast.error('Could not update favorites. Please try again.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}
