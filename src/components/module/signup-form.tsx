"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

// Validation schema
const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
    role: z.enum(["STUDENT", "TUTOR"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user...");
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("User created successfully!", { id: toastId });
        router.push("/"); // Redirect to home page
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  const handleGoogleLogin = () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "https://skill-bridge-client-a4.vercel.app",
    });
  };

  return (
    <Card
      {...props}
      className="max-w-md mx-auto mt-12 shadow-lg border rounded-xl"
    >
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription className="text-gray-500 mt-1">
          Join us and start your journey
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup className="space-y-3">
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Email */}
            <form.Field
              name="email"
              children={(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Password */}
            <form.Field
              name="password"
              children={(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Confirm Password */}
            <form.Field
              name="confirmPassword"
              children={(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Role Dropdown */}
            <form.Field
              name="role"
              children={(field) => (
                <Field>
                  <FieldLabel>Role</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STUDENT">STUDENT</SelectItem>
                      <SelectItem value="TUTOR">TUTOR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-100"
        >
          Sign up with Google
        </Button>

        <FieldDescription className="text-center mt-2 text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
