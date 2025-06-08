import { createAssignment } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import React from 'react'

const useCreateAsignment = () => {

      const createAssignmentResponse = useMutation({
    mutationFn: async (credentials: any) =>
      await createAssignment(credentials),
  });

  return {createAssignmentResponse}
}

export default useCreateAsignment