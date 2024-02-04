import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface IData {
  label: string;
  value: string;
}

interface IDetailCard {
  data: IData[];
  avatarUrl: string;
}

const DetailCard = ({ data, avatarUrl }: IDetailCard) => {
  return (
    <Card className="w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Avatar className="mx-auto mb-5">
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <table className="text-left mx-auto">
          {data.map((e) => (
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

export default DetailCard;
