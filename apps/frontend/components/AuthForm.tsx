"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { login, register, type AuthResponse } from "@/actions/auth";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

type Props = {
  type: "login" | "register";
};

const registerSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const AuthForm = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const schema = props.type === "register" ? registerSchema : loginSchema;

  const form = useForm<RegisterFormValues | LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues:
      props.type === "register"
        ? { username: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const handleAuthSuccess = (response: AuthResponse) => {
    if (response.data?.token) {
      // Store token in localStorage
      localStorage.setItem("authToken", response.data.token);

      // Store user data if needed
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    }

    toast.success("Success", {
      description:
        props.type === "register"
          ? "Registration successful!"
          : "Login successful!",
    });

    // Redirect to home or dashboard
    router.push("/");
  };

  const onSubmit = async (values: RegisterFormValues | LoginFormValues) => {
    setIsSubmitting(true);

    try {
      const isValid = await form.trigger();
      if (!isValid) {
        toast.error("Validation Error", {
          description: "Please fix the errors in the form",
        });
        return;
      }

      let response: AuthResponse;

      if (props.type === "register") {
        response = await register(values as RegisterFormValues);
      } else {
        response = await login(values as LoginFormValues);
      }

      if (response.success) {
        handleAuthSuccess(response);
      } else {
        if (response.errors) {
          Object.entries(response.errors).forEach(([field, messages]) => {
            form.setError(field as any, {
              type: "server",
              message: messages.join(", "),
            });
          });
        }
        toast.error("Error", {
          description: response.message || "Authentication failed",
        });
      }
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";
      if (error.message?.includes("Network Error")) {
        errorMessage = "Unable to connect to server. Check your network.";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid email or password";
      }

      toast.error("Error", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {props.type === "register" && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  disabled={isSubmitting}
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
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : props.type === "login" ? (
            "Login"
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
