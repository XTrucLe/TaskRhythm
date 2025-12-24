import { useForm } from "react-hook-form";
import { InputField } from "../../components/ui/InputField";
import {
  registerSchema,
  type RegisterSchemas,
} from "../../features/auth/utils/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FloatingInput } from "../../components/ui/FloatingInput";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemas>({
    resolver: zodResolver(registerSchema),
  });
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = (data: RegisterSchemas) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-3">
      <div className="card w-full max-w-lg shadow-md rounded-2xl p-8 my-2">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Register Account
          </h1>
          <p className="text-center mb-6 text-slate-400">
            Create an account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            {...register("fullName")}
            error={errors.fullName?.message}
          />

          <InputField
            label="Email"
            placeholder="example@email.com"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <InputField
            label="Phone Number"
            placeholder="(+84) 123 456 789"
            type="tel"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />

          <InputField
            label="Date of Birth"
            type="date"
            {...register("dateOfBirth")}
            error={errors.dateOfBirth?.message}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          <InputField
            label="Confirm Password"
            placeholder="Re-enter your password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <FloatingInput
            label="I agree to the Terms and Conditions"
            type="checkbox"
            {...register("terms")}
            error={errors.terms?.message}
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
}
