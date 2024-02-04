import DetailCard from "@/components/DetailCard";
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
    queryKey: ["user-info", user?.Id],
    queryFn: () => getUserInfo(user?.Id || ""),
    enabled: !!user?.Id,
  });

  const dataToMap = [
    { label: "Name", value: data?.name || "" },
    { label: "Email", value: data?.email || "" },
  ];

  return data && <DetailCard data={dataToMap} avatarUrl={data.avatar} />;
};

export default ProfilePage;
