import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getTourist } from "@/services/touristService/touristService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const TouristDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["tourist", id],
    queryFn: ({ queryKey }) => getTourist(queryKey[1] || ""),
    enabled: !!id,
  });

  const dataToMap = [
    { label: "Name", value: data?.tourist_name },
    { label: "Location", value: data?.tourist_location },
    { label: "Email", value: data?.tourist_email },
  ];

  return (
    <Card className="w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>{data?.tourist_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Avatar className="mx-auto mb-5">
          <AvatarImage src={data?.tourist_profilepicture} />
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

export default TouristDetailPage;
