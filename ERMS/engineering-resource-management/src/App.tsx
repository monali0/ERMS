import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import ManagerDashboard from "./pages/ManagerDashboard";
import EngineerDashboard from "./pages/EngineerDashboard";
import CreateAssignment from "./pages/CreateAssignment";
import ProjectList from "./pages/ProjectList";
import ProjectForm from "./pages/ProjectForm";
import PrivateRoute from "./ProtectedRoute";
import CommonPageLayout from "./components/layout/CommonPageLAyout";

interface PrivateRouteProps {
  children: JSX.Element;
  role: ("manager" | "engineer" | string)[];
}

// function PrivateRoute({ children, roles }: PrivateRouteProps): JSX.Element {
//     const { isLoading,user } = useLogin();

//   if (isLoading) return <div>Loading...</div>;

//   if (user && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
//   if (!user) return <Navigate to="/login" replace />;

//   return children;
// }

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/manager"
          element={
            <CommonPageLayout>
              <PrivateRoute
                role={["manager"]}
                children={<ManagerDashboard />}
              />
            </CommonPageLayout>
          }
        />
        <Route
          path="/create-assignment"
          element={
            <PrivateRoute role={["manager"]}>
              <CommonPageLayout><CreateAssignment /></CommonPageLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute role={["manager"]}>
              <CommonPageLayout>
                <ProjectList />
              </CommonPageLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/new"
          element={
            <PrivateRoute role={["manager"]}>
              <CommonPageLayout>
                <ProjectForm />
              </CommonPageLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/edit/:id"
          element={
            <PrivateRoute role={["manager"]}>
              <CommonPageLayout>
                <ProjectForm />
              </CommonPageLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/engineer"
          element={
            <PrivateRoute role={["engineer"]}>
              <CommonPageLayout>
                <EngineerDashboard />
              </CommonPageLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
