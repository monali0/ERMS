import { removeAccessToken, removeRefreshToken } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'

const useLogOut = () => {
      const queryClient = useQueryClient();

    const logout = useMutation({
    mutationFn: async () => {
      try {
        removeAccessToken();
        removeRefreshToken();
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        queryClient.removeQueries({ queryKey: ["currentUser"] });
      } catch (error) {
        throw new Error("Failed to logout: " + error);
      }
    },
  });
  return {
    logout: logout.mutate,
    isLoading: logout.isPending,
    error: logout.error,
    isSuccess: logout.isSuccess,
};
}

export default useLogOut