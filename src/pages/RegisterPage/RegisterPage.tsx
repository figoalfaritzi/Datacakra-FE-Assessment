import AuthText from "@/components/AuthText/AuthText";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { IErrorResponse } from "@/services/services.types";
import {
  IPostRegisterRequest,
  IPostRegisterResponse,
  postRegister,
} from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const RegisterPage = () => {
  const formSchema = z.object({
    name: z.string(),
    email: z.string().min(2).max(50),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [success, setSuccess] = useState<boolean>();

  const { toast } = useToast();

  const { mutate } = useMutation<
    IPostRegisterResponse,
    AxiosError<IErrorResponse>,
    IPostRegisterRequest
  >({
    mutationFn: postRegister,
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error) => {
      toast({
        title: "Register failed",
        description: error.response?.data.message,
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Card className="w-1/2 mx-auto">
      <CardContent className="p-5">
        {success ? (
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Registration success. Log in{" "}
            <Link to="/login">
              {" "}
              <span className="font-bold hover:text-blue-500">here</span>
            </Link>
          </h4>
        ) : (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Type your name here" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Type your email here"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Type your password here"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Register</Button>
              </form>
            </Form>
            <AuthText
              text="Already have an account?"
              redirectText="Sign in"
              redirectUrl="/login"
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
