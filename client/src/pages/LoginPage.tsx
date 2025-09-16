import Button from "../components/Button";
import { CardBody, CardHeader } from "../components/Card";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "../validates/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // call API login ở đây
  };

  return (
    <div className="space-y-6">
      <CardHeader className="text-center">
        <h2
          className="text-3xl font-extrabold 
          bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
          bg-clip-text text-transparent"
        >
          Welcome Back
        </h2>
        <p className="mt-2 text-[var(--color-text-muted)]">
          Sign in to continue
        </p>
      </CardHeader>

      <CardBody className="space-y-4">
        <Input
          label="Email"
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
        />
        <Input
          label="Password"
          {...register("password")}
          type="password"
          placeholder="••••••••"
          error={errors.password?.message as string}
        />

        <Button variant="primary" fullWidth onClick={handleSubmit(onSubmit)}>
          Sign In
        </Button>

        <div className="relative my-4">
          <span
            className="absolute left-1/2 -translate-x-1/2 -top-3 
            bg-white px-2 text-sm text-[var(--color-text-muted)]"
          >
            or continue with
          </span>
          <div className="border-t border-[var(--color-text-muted)]/50"></div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" fullWidth>
            Google
          </Button>
          <Button variant="outline" fullWidth>
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-[var(--color-text-muted)]">
          Don’t have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-[var(--color-primary)] hover:underline"
          >
            Register
          </button>
        </p>
      </CardBody>
    </div>
  );
}
