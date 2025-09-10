import Button from "../components/Button";
import { CardBody, CardHeader } from "../components/Card";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../validates/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
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
    <div className="space-y-6">
      <CardHeader className="text-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-600 mt-2">Join us and start your journey</p>
      </CardHeader>

      <CardBody className="space-y-4">
        <Input
          label="Full Name"
          {...register("fullName")}
          type="text"
          placeholder="John Doe"
          error={errors.fullName?.message as string}
        />
        <Input
          label="Email"
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
        />

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

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            defaultValue=""
            {...register("gender")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-3.5
               focus:outline-none focus:ring-2 focus:ring-indigo-500
               text-gray-900 placeholder-gray-400"
          >
            <option value="" disabled hidden>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>

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

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("terms")}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded bg-transparent"
            id="terms"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              terms and conditions
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>
        )}
        <Button variant="primary" fullWidth onClick={handleSubmit(onSubmit)}>
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-indigo-600 hover:underline"
          >
            Login
          </button>
        </p>
      </CardBody>
    </div>
  );
}
