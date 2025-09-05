import { useState } from "react";
import Button from "../components/Button";
import Card, { CardHeader, CardBody } from "../components/Card";
import Input from "../components/Input";

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="space-y-6">
      <CardHeader className="text-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-600 mt-2">Sign in to continue</p>
      </CardHeader>

      <CardBody className="space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />

        <Button variant="primary" fullWidth>
          Sign In
        </Button>

        <div className="relative my-4">
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white/50 px-2 text-sm text-gray-600 backdrop-blur">
            or continue with
          </span>
          <div className="border-t border-gray-300/50"></div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" fullWidth>
            Google
          </Button>
          <Button variant="outline" fullWidth>
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-indigo-600 hover:underline"
          >
            Register
          </button>
        </p>
      </CardBody>
    </div>
  );
}

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="space-y-6">
      <CardHeader className="text-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-600 mt-2">Join us and start your journey</p>
      </CardHeader>

      <CardBody className="space-y-4">
        <Input label="Full Name" type="text" placeholder="John Doe" />
        <Input label="Email" type="email" placeholder="you@example.com" />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Phone" type="tel" placeholder="+84 123 456 789" />
          <Input label="Date of Birth" type="date" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            defaultValue=""
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
        </div>

        <Input label="Password" type="password" placeholder="••••••••" />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
        />

        <Button variant="primary" fullWidth>
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

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <style>{`
          @keyframes blob {
            0% {
              transform: translate(0, 0) scale(1);
            }
            50% {
              transform: translate(-10px, 15px) scale(1.05);
            }
            100% {
              transform: translate(0, 0) scale(1);
            }
          }
           
        `}</style>
      {/* Floating gradient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_8s_infinite]" />
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_10s_infinite]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_12s_infinite]" />

      <div
        className={`
          absolute bottom-60 -right-60 w-2xl h-9/12 rounded-md rotate-120
          opacity-60
           bg-blue-500
        `}
        style={{ animation: "blob 7s infinite" }}
      />

      <div
        className={`
          absolute bottom-40 -left-60 w-2xl h-9/12 rounded-md rotate-120
          opacity-60
           bg-blue-500
        `}
        style={{ animation: "blob 7s infinite" }}
      />

      {/* Auth Card */}
      <Card className="relative z-10 w-full max-w-lg p-8 bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl">
        {isLogin ? (
          <LoginForm onSwitch={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitch={() => setIsLogin(true)} />
        )}
      </Card>
    </div>
  );
}
