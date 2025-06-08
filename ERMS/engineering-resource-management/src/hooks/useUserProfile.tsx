import httpService from '@/service/ApiService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const useUserProfile = () => {
 const profileResponse = useQuery({
        queryKey: ['my-profile'],
        queryFn: async () => {
        const response = await httpService.get('api/auth/profile');
        return response.data;
        },
    
       
    });

  return {profileResponse};
}

export default useUserProfile;