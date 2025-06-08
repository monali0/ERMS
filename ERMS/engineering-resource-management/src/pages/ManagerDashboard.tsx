// src/pages/ManagerDashboard.tsx

import React from "react"; // ← ensure this import exists
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getEngineersWithCapacity } from "@/lib/api";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useGetAllEngineer from "@/hooks/useGetAllEngineer";
import useUserProfile from "@/hooks/useUserProfile";
import { Badge } from "@/components/ui/Badge";
interface Engineer {
  id: string;
  name: string;
  skills: string[];
  seniority: string;
  maxCapacity: number;
  currentAllocation: number;
}

export default function ManagerDashboard() {
  const { response } = useGetAllEngineer();
  const navigate = useNavigate();
  const { profileResponse } = useUserProfile();
  const profile = profileResponse?.data?.user;

  return (
    <>
    {
      response.isLoading || profileResponse.isLoading ? (
        <div>Loading...</div>
      ):
      
<>

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

        
      </div>
    </div>

      <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Team Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {response.data.map((eng) => {
          

          return (
            <Card key={eng.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{eng.name}</p>
                    <p className="text-sm text-gray-500">{eng.seniority}</p>
                  </div>
                  <Progress
                    value={(eng.currentAllocation / eng.maxCapacity) * 100}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-4">
        <Button onClick={() => navigate("/create-assignment")}>
          Create Assignment
        </Button>
        <Button variant="secondary" onClick={() => navigate("/projects")}>
          Manage Projects
        </Button>
      </div>
    </div>
</>

    }
    
    </>
  );
}
