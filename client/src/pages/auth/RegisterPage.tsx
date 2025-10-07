import { CardBody, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../validates/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../../components/ui/Select";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Register data:", data);
    console.log(errors);
    // call API register ở đây
  };

  return (
    <div className="space-y-8 my-3">
      {/* Header */}
      <CardHeader className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Join us and start your journey
        </p>
      </CardHeader>

      {/* Body */}
      <CardBody>
        {/* Full Name + Gender */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 w-full">
            <Input
              label="Full Name"
              {...register("fullName")}
              type="text"
              placeholder="John Doe"
              error={errors.fullName?.message as string}
            />
          </div>
          <Select
            label="Gender"
            {...register("gender")}
            className="col-span-1"
            error={errors.gender?.message}
          >
            <option value="" disabled hidden>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </div>

        {/* Email */}
        <Input
          label="Email"
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
        />

        {/* Phone + DOB */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Phone"
            {...register("phoneNumber")}
            type="tel"
            placeholder="+84 123 456 789"
            error={errors.phoneNumber?.message as string}
          />
          <Input
            label="Date of Birth"
            {...register("dateOfBirth")}
            type="date"
            error={errors.dateOfBirth?.message}
          />
        </div>

        {/* Passwords */}
        <Input
          label="Password"
          {...register("password")}
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          {...register("confirmPassword")}
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
        />

        {/* Terms */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("terms")}
              id="terms"
              className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-[var(--color-text-muted)] rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-[var(--color-text-primary)]"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-[var(--color-primary)] hover:underline"
              >
                terms and conditions
              </a>
            </label>
          </div>
          {errors.terms ? (
            <p className="text-sm text-red-500">{errors.terms.message}</p>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>

        {/* Action */}
        <Button onClick={handleSubmit(onSubmit)} className="w-full">
          Sign Up
        </Button>
      </CardBody>
    </div>
  );
}
