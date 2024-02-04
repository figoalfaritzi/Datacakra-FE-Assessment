import DetailCard from "@/components/DetailCard";
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
    { label: "Name", value: data?.tourist_name || "" },
    { label: "Location", value: data?.tourist_location || "" },
    { label: "Email", value: data?.tourist_email || "" },
  ];

  return (
    data && (
      <DetailCard data={dataToMap} avatarUrl={data?.tourist_profilepicture} />
    )
  );
};

export default TouristDetailPage;
