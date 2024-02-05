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
import { PencilIcon } from "lucide-react";
import IEditDialog from "./EditDialog.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTourist,
  getTourist,
} from "@/services/touristService/touristService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import formSchema from "../AddEditFormSchema";

const EditDialog = ({ id }: IEditDialog) => {
  const queryClient = useQueryClient();

  const [clicked, setClicked] = useState(false);

  const { data } = useQuery({
    queryKey: ["tourist", id],
    queryFn: ({ queryKey }) => getTourist(queryKey[1] || ""),
    enabled: clicked,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.tourist_name || "",
      location: data?.tourist_location || "",
      email: data?.tourist_email || "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.tourist_name,
        location: data.tourist_location,
        email: data.tourist_email,
      });
    }
  }, [data, form]);

  const { mutate } = useMutation({
    mutationFn: deleteTourist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tourists"] }),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger onClick={() => setClicked(true)}>
        <PencilIcon className="cursor-pointer hover:fill-slate-200" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit tourist</DialogTitle>
          <DialogDescription>
            Make changes to tourist here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-left">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={field.name} className="text-right">
                      Name
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Type tourist's name here"
                        className="col-span-3"
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="text-left">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={field.name} className="text-right">
                      Location
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Type tourist's location here"
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={field.name} className="text-right">
                      Name
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Type tourist's email here"
                        className="col-span-3"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{"Save changes"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
