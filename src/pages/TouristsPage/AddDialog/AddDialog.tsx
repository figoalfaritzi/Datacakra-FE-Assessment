import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTourist } from "@/services/touristService/touristService";
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
import formSchema from "../AddEditFormSchema";
import { useToast } from "@/components/ui/use-toast";
import {
  IPostTouristRequest,
  ITouristResponse,
} from "@/services/touristService/touristService.types";
import { IErrorResponse } from "@/services/services.types";
import { AxiosError } from "axios";

const AddDialog = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      email: "",
    },
  });

  const { toast } = useToast();

  const { mutate } = useMutation<
    ITouristResponse,
    AxiosError<IErrorResponse>,
    IPostTouristRequest
  >({
    mutationFn: postTourist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourists"] });
      toast({ title: "Tourist created" });
      form.reset();
    },
    onError: (error) => toast({ title: error.response?.data.message }),
  });

  const onSubmit = ({ email, location, name }: z.infer<typeof formSchema>) => {
    mutate({
      tourist_email: email,
      tourist_location: location,
      tourist_name: name,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add tourist</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add tourist</DialogTitle>
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
                      Email
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
              <Button type="submit">Add tourist</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
