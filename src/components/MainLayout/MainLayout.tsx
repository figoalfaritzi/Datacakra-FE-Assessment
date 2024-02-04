import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { IMainLayout } from "./MainLayout.types";
import useAuth from "@/authentication/useAuth";

const MainLayout = ({ children }: IMainLayout) => {
  const { logout } = useAuth();

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/tourist">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Tourist
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/profile">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Profile
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem onClick={logout} className="cursor-pointer">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Logout
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {children}
    </>
  );
};

export default MainLayout;
