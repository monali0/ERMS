import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, createProject, updateProject } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  description: string;
  status: string;
}

export default function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      getProjectById(id).then((p) => {
        reset({ name: p.name, description: p.description, status: p.status });
        setLoading(false);
      });
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (data: FormData) => {
    if (isEdit && id) {
      await updateProject(id, data);
    } else {
      await createProject(data);
    }
    navigate("/projects");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit Project" : "New Project"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input {...register("name", { required: true })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <Input {...register("description", { required: true })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select {...register("status", { required: true })} className="w-full border p-2 rounded">
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <Button type="submit" className="w-full">
          {isEdit ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}
