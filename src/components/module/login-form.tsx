"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const handleGoogleLogin = () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const form = useForm({
    
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("FORM SUBMITTED", value);
      const toastId = toast.loading("Logging in...");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User logged in Successfully", { id: toastId });

        router.push("/");
        router.refresh();
      } catch (error) {
        toast.error("An error occurred while logging in", { id: toastId });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Wrap the entire form structure in the <form> tag */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Email Field */}
              <form.Field
                name="email"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {field.state.meta.touched && field.state.meta.errors ? (
                      <em className="text-sm text-red-500">
                        {field.state.meta.errors}
                      </em>
                    ) : null}
                  </Field>
                )}
              />

              {/* Password Field */}
              <form.Field
                name="password"
                children={(field) => (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {field.state.meta.touched && field.state.meta.errors ? (
                      <em className="text-sm text-red-500">
                        {field.state.meta.errors}
                      </em>
                    ) : null}
                  </Field>
                )}
              />

              <Field>
                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Login
                </Button>

                {/* Google Button */}
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  Login with Google
                </Button>

                <FieldDescription className="text-center mt-2">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline">
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
