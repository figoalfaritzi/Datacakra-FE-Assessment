import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth";
import MainLayout from "@/components/MainLayout/MainLayout";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
