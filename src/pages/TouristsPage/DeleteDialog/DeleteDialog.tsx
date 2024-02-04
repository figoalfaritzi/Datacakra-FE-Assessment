import { Trash2Icon } from "lucide-react";
import IDeleteDialog from "./DeleteDialog.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTourist } from "@/services/touristService/touristService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteDialog = ({ id }: IDeleteDialog) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTourist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tourists"] }),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon className="cursor-pointer hover:fill-red-200" color="red" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            tourist data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate(id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
