import { CardBody, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  type LoginFormValues,
} from "../../validates/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/authService";
import useRouting from "../../hooks/useRouting";

function DividerWithText({ text }: { text: string }) {
  return (
    <div className="flex items-center my-4">
      <div className="flex-1 border-t border-[var(--color-text-muted)]/50"></div>
      <span className="px-3 text-sm text-[var(--color-text-muted)] whitespace-nowrap">
        {text}
      </span>
      <div className="flex-1 border-t border-[var(--color-text-muted)]/50"></div>
    </div>
  );
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { goDashboard } = useRouting();

  const onSubmit = (data: LoginFormValues) => {
    authService.login(data).then(() => {
      goDashboard();
    });
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <CardHeader className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-[var(--color-text-muted)]">Sign in to continue</p>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Sign In
          </Button>

          <DividerWithText text="or continue with" />

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              Google
            </Button>
            <Button variant="outline" className="flex-1">
              GitHub
            </Button>
          </div>
        </form>
      </CardBody>
    </div>
  );
}
