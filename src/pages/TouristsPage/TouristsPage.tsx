import { getTourists } from "@/services/touristService/touristService";
import { useQuery } from "@tanstack/react-query";
import TouristsTable from "./TouristsTable";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ITouristResponse } from "@/services/touristService/touristService.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import AddDialog from "./AddDialog";

const TouristsPage = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ["tourists", pageIndex],
    queryFn: () => getTourists(String(pageIndex + 1)),
  });

  const handleFetchNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const handlePreviousNextPage = () => {
    setPageIndex(pageIndex - 1);
  };

  const PAGE_SIZE = 10;
  const columns: ColumnDef<ITouristResponse>[] = [
    {
      header: "No.",
      cell: ({ row }) => `${row.index + 1 + PAGE_SIZE * pageIndex}.`,
    },
    {
      accessorKey: "tourist_profilepicture",
      header: "",
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage src={row.original.tourist_profilepicture} />
          <AvatarFallback>{row.original.tourist_name}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "tourist_name",
      header: "Name",
    },
    {
      accessorKey: "tourist_location",
      header: "Location",
    },
    {
      accessorKey: "tourist_email",
      header: "Email",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/tourist/${row.original.id}/detail`}>
            <EyeIcon className="cursor-pointer hover:fill-slate-200" />
          </Link>
          <EditDialog id={row.original.id} />
          <DeleteDialog id={row.original.id} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-row-reverse mb-5">
        <AddDialog />
      </div>
      {data && (
        <TouristsTable
          columns={columns}
          data={data}
          handleFetchNextPage={handleFetchNextPage}
          handleFetchPreviousPage={handlePreviousNextPage}
          pageIndex={pageIndex}
        />
      )}
    </>
  );
};

export default TouristsPage;
