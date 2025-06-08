import { useEffect, useState } from "react";
import { getMyAssignments } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import useUserProfile from "@/hooks/useUserProfile";
import { Badge } from "@/components/ui/Badge";

interface Assignment {
  project: {
    name: string;
    description: string;
  };
  startDate: string;
  endDate: string;
  role: string;
}

export default function EngineerDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const { profileResponse } = useUserProfile();

  const profile = profileResponse?.data?.user;

  useEffect(() => {
    getMyAssignments().then((res) => {
      if (res?.success) {
        setAssignments(res.assignments);
      }
    });
  }, []);

  if (profileResponse.isLoading) {
    return <div className="p-6 text-lg font-medium">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {profile?.name.split(" ")[0]}</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1">
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Profile Overview</h2>
              <p className="text-sm text-gray-500">Basic information</p>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-medium">Name:</span> {profile.name}</p>
              <p><span className="font-medium">Email:</span> {profile.email}</p>
              <p><span className="font-medium">Role:</span> 
                <Badge variant="outline" className="ml-2 capitalize">{profile.role}</Badge>
              </p>
              <p><span className="font-medium">Department:</span> {profile.department}</p>
              <p><span className="font-medium">Seniority:</span> {profile.seniority}</p>
              <p><span className="font-medium">Max Capacity:</span> {profile.maxCapacity} projects</p>
            </div>

            <div>
              <p className="font-medium text-sm text-gray-600 mb-1">Skills</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignments */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Current Assignments</h2>
          </div>

          {assignments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {assignments.map((a, i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-2">
                    <div className="text-lg font-medium text-gray-900">{a.project.name}</div>
                    <div className="text-sm text-gray-500">{a.project.description}</div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Role:</strong> {a.role}</p>
                      <p><strong>Duration:</strong> {a.startDate} → {a.endDate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No current assignments.</div>
          )}
        </div>
      </div>
    </div>
  );
}
