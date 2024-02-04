import usePersistedState from "@/hooks/usePersistedState";
import AuthContext from "./AuthContext";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser, removeUser] = usePersistedState<IPostLoginResponseData>(
    "USER",
    USER_DEFAULT_VALUE,
  );
  const navigate = useNavigate();

  const { mutateAsync } = useMutation<
    IPostLoginResponse,
    AxiosError<IErrorResponse>,
    ILogin
  >({ mutationFn: postLogin });

  const login = async (data: ILogin) => {
    const loginResponse = await mutateAsync(data);
    setUser(loginResponse.data);
    navigate("/profile");
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
