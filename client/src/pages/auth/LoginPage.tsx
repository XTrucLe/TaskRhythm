import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { InputField } from "../../components/ui/InputField";
import {
  type LoginSchemas,
  loginSchema,
} from "../../features/auth/utils/auth.validate";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemas>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitForm = (data: LoginSchemas) => {
    console.log("submit", data);
  };

  const handleSocialLogin = (provider: string) => {
    console.log("social login", provider);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="card w-full max-w-lg rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Welcome Back
        </h1>

        <p className="text-center mb-6 text-slate-400">
          Please sign in to continue
        </p>

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-4"
          noValidate
        >
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="text-right -mt-4 -mb-2">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
              tabIndex={-1}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold text-lg hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="flex justify-center gap-4 gap-x-8">
          {[
            { icon: <FaGoogle size={36} />, color: "#DB4437", name: "google" },
            { icon: <FaGithub size={36} />, color: "#000", name: "github" },
            {
              icon: <FaFacebook size={36} />,
              color: "#1877F2",
              name: "facebook",
            },
          ].map(({ icon, color, name }) => (
            <button
              key={name}
              type="button"
              onClick={() => handleSocialLogin(name)}
              className="w-12 h-12 flex items-center justify-center rounded-full  hover:scale-110 transition-transform"
              style={{ color }}
            >
              {icon}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <a href="/register" tabIndex={-1}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
