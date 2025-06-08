import httpService from '@/service/ApiService'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const useGetCurrentUser = () => {
    const response = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
        const response = await httpService.get('api/auth/me');
        return response.data;
        },
    
       
    })

  return {response}
}

export default useGetCurrentUser