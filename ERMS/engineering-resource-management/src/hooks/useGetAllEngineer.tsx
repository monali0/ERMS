import { getEngineersWithCapacity } from '@/lib/api'
import httpService from '@/service/ApiService'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const useGetAllEngineer = () => {
    const response = useQuery({
        queryKey: ['engineersWithCapacity'],
        queryFn: async () => {
        const response = await getEngineersWithCapacity();
        return response.data;
        },
    
       
    })

  return {response}
}

export default useGetAllEngineer