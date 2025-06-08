import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import httpService from "@/service/ApiService";
import app_configs from "@/config";
import { setAccessToken } from "@/lib/utils";
import { useLogin } from "@/hooks/userAuth";
import { useEffect } from "react";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
interface FormData {
  email: string;
  password: string; // still needed for form, even if API doesn't use it
}

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();

  const { login, isLoading, error, user } = useLogin();
  const { response } = useGetCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if(response.data) {
      const { user } = response.data;
      if (user) {
        setAccessToken(response.data.token);
        // Redirect based on user role
        if (user.role === "manager") {
          navigate("/manager");
        } else if (user.role === "engineer") {
          navigate("/engineer");
        }
      }
    }

  }, [response.isSuccess]);


  const onSubmit = async (data: FormData) => {
    await login(data);
    if (user) {
      // Redirect based on user role
      if (user.role === "manager") {
        window.location.href = "/manager";
      } else if (user.role === "engineer") {
        window.location.href = "/engineer";
      } else {
        return <div>Unauthorized role</div>;
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-lg font-semibold">Loading...</div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 bg-white rounded-lg shadow-md w-full max-w-sm"
          >
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
