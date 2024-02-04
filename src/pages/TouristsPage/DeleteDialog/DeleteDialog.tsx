import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import IDeleteDialog from "./DeleteDialog.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTourist } from "@/services/touristService/touristService";

const DeleteDialog = ({ id }: IDeleteDialog) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTourist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tourists"] }),
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2Icon className="cursor-pointer hover:fill-red-200" color="red" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            tourist data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => mutate(id)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
