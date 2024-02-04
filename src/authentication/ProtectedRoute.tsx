import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import MainLayout from "@/components/MainLayout/MainLayout";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
