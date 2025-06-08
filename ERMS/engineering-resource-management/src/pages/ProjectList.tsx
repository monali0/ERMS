import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useProject from "@/hooks/useProject";
interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
}

export default function ProjectList() {
  const navigate = useNavigate();
  const { allProjects } = useProject();
  

  const handleDelete = async (id: string) => {
    // await deleteProject(id);
    // setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <>
    {
      allProjects.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <Button onClick={() => navigate("/projects/new")}>New Project</Button>
          </div>
          <div className="space-y-4">
            {allProjects.data.map((p) => (
              <Card key={p._id}>
                <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">{p.description}</p>
                <p className="text-sm">Status: {p.status}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => navigate(`/projects/edit/${p._id}`)}>
                  Edit
                </Button>
                <Button variant="secondary" onClick={() => handleDelete(p._id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {allProjects.data.length === 0 && (
          <p className="text-gray-500">No projects available.</p>
        )}
      </div>
    </div>
    )}
  </>

  );
}
