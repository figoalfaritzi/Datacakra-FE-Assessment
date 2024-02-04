import usePersistedState from "@/hooks/usePersistedState";
import AuthContext from "./AuthContext";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ILogin } from "./authentication.types";
import { useMutation } from "@tanstack/react-query";
import {
  IPostLoginResponse,
  IPostLoginResponseData,
  postLogin,
} from "@/services/userService";
import { AxiosError } from "axios";
import { IErrorResponse } from "@/services/services.types";
import { USER_DEFAULT_VALUE } from "@/constants";
import { useToast } from "@/components/ui/use-toast";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser, removeUser] = usePersistedState<IPostLoginResponseData>(
    "USER",
    USER_DEFAULT_VALUE,
  );
  const navigate = useNavigate();
  const location = useLocation();

  const { mutateAsync } = useMutation<
    IPostLoginResponse,
    AxiosError<IErrorResponse>,
    ILogin
  >({ mutationFn: postLogin });

  const { toast } = useToast();

  const login = async (data: ILogin) => {
    try {
      const loginResponse = await mutateAsync(data);
      setUser(loginResponse.data);
      const from = location.state?.from || "/tourist";
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: "Login failed",
      });
    }
  };

  const logout = () => {
    removeUser();
    navigate("/", { replace: true });
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
