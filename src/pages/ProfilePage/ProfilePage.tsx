import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    { label: "Name", value: data?.name },
    { label: "Email", value: data?.email },
  ];

  return (
    <Card className="w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Avatar className="mx-auto mb-5">
          <AvatarImage src={data?.avatar} />
        </Avatar>
        <table className="text-left mx-auto">
          {dataToMap.map((e) => (
            <tr key={e.label}>
              <td className="w-1/2 py-2">
                <p className="font-bold">{e.label}</p>
              </td>
              <td>
                <p>{e.value}</p>
              </td>
            </tr>
          ))}
        </table>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
