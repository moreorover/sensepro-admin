"use client";

import { useSession } from "@/hooks/use-session";
import { authClient } from "@/lib/auth-client";
import { signInFormSchema } from "@/lib/auth-schema";
import { Button, Card, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";

export function LoginForm() {
  const initialValues =
    process.env.NODE_ENV === "development"
      ? { email: "x@x.com", password: "password123" }
      : { email: "", password: "" };

  const form = useForm({
    mode: "uncontrolled",
    initialValues,

    validate: zodResolver(signInFormSchema),
  });

  async function handleSubmit(values: typeof form.values) {
    const { email, password } = values;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          // toast({
          //   title: "Please wait...",
          // });
        },
        onSuccess: () => {
          form.reset();
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onError: (ctx) => {
          notifications.show({
            color: "red",
            title: "Sign In Failed",
            message: "Please make sure your email and password is correct.",
          });
        },
      },
    );
  }

  return (
    <Card withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="test@example.com"
          required
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        {/*<Group mt="md" justify="space-between">*/}
        {/*<Checkbox label="Remember me" />*/}
        {/*<Anchor size="sm" href="#">*/}
        {/*  Forgot Password？*/}
        {/*</Anchor>*/}
        {/*</Group>*/}
        <Button fullWidth mt="xl" type="submit">
          Sign In
        </Button>
      </form>
    </Card>
  );
}
