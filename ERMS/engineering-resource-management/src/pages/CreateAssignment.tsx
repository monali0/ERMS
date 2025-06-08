import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useCreateAsignment from "@/hooks/useCreateAsignment";
import useGetAllEngineer from "@/hooks/useGetAllEngineer";
import useProject from "@/hooks/useProject";

const assignmentSchema = z.object({
  engineerId: z.string(),
  projectId: z.string(),
  allocationPercentage: z
    .number({ invalid_type_error: "Must be a number" })
    .min(1, "Must be at least 1%")
    .max(100, "Cannot exceed 100%"),
  startDate: z.string(),
  endDate: z.string(),
  role: z.string().min(1, "Role is required"),
});

type AssignmentForm = z.infer<typeof assignmentSchema>;

export default function CreateAssignment() {
  const { createAssignmentResponse } = useCreateAsignment();
  const { response } = useGetAllEngineer();
  const { allProjects } = useProject();

  const form = useForm<AssignmentForm>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      engineerId: "",
      projectId: "",
      allocationPercentage: 0,
      startDate: "",
      endDate: "",
      role: "",
    },
  });
  const [engineers, setEngineers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEngineers(response.data);
    setProjects(allProjects.data);
  }, [response.isSuccess, allProjects.isSuccess]);

  async function onSubmit(values: AssignmentForm) {
    alert (JSON.stringify(values, null, 2));
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Assignment</h1>
      <Form {...form}>
        <form
          onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="engineerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Engineer</FormLabel>
                <FormControl>
                  <select {...field} className="w-full border p-2 rounded">
                    <option value="">Select</option>
                    {response.data.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.engineerId?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <FormControl>
                  <select {...field} className="w-full border p-2 rounded">
                    <option value="">Select</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.projectId?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="allocationPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allocation %</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.allocationPercentage?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.startDate?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.endDate?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Developer, Tech Lead..." {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.role?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit Assignment
          </Button>
        </form>
      </Form>
    </div>
  );
}
