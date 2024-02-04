import { USER_DEFAULT_VALUE } from "@/constants";
import usePersistedState from "@/hooks";
import { IPostLoginResponseData, getUserInfo } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
  const [user] = usePersistedState<IPostLoginResponseData>(
    "USER",
    USER_DEFAULT_VALUE,
  );

  const { data } = useQuery({
    queryKey: [],
    queryFn: () => getUserInfo(user?.Id || ""),
    enabled: !!user?.Id,
  });

  return <div>{JSON.stringify(data)}</div>;
};

export default ProfilePage;
