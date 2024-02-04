import { IPostLoginResponseData } from "@/services/userService";
import { createContext } from "react";
import { ILogin } from "./authentication.types";

interface IAuthContext {
  user: IPostLoginResponseData | undefined;
  login: (data: ILogin) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: {
    $id: "",
    Id: "",
    Name: "",
    Email: "",
    Token: "",
  },
  login: () => undefined,
  logout: () => undefined,
});

export default AuthContext;
