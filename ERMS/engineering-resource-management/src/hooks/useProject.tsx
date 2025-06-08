import { getProjects } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { all } from "axios";
import { create } from "zustand";

const useProject = () => {
  const allProjects = useQuery({
    queryKey: ["allProjects"],
    queryFn: async () => {
      const response = await getProjects();
      return response.data;
    },
  });


  return { allProjects };
};

export default useProject;
