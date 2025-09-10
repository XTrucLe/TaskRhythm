import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card";
import LoginForm from "./LoginPage";
import RegisterForm from "./RegisterPage";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      {/* Shapes background */}
      <motion.div className="absolute inset-0">
        {/* Circle */}
        <motion.div
          className="absolute w-60 h-60 bg-amber-300 rounded-full "
          animate={
            isLogin
              ? { top: "-10%", left: "-10%", scale: 1, opacity: 0.3 }
              : { top: "0%", left: "10%", scale: 0.7, opacity: 0.15 }
          }
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Square */}
        <motion.div
          className="absolute w-72 h-72 bg-indigo-400 rounded-lg "
          animate={
            isLogin
              ? { bottom: "-15%", right: "-10%", rotate: 15, opacity: 0.25 }
              : { bottom: "5%", right: "5%", rotate: -10, opacity: 0.1 }
          }
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Diamond (ẩn một phần, chỉ ló ra) */}
        <motion.div
          className="absolute w-56 h-56 bg-indigo-200 rotate-45 "
          animate={
            isLogin
              ? { top: "40%", right: "0%", opacity: 0.2 }
              : { top: "30%", right: "-20%", opacity: 0.05 }
          }
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Auth Card */}
      <Card className="relative z-10 w-full max-w-lg p-8 bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
        <motion.div
          layout
          className="min-h-[480px]"
          transition={{
            layout: {
              duration: 1,
              ease: "linear",
              type: "spring",
              damping: 20,
              stiffness: 100,
            },
          }}
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <LoginForm onSwitch={() => setIsLogin(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <RegisterForm onSwitch={() => setIsLogin(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
    </div>
  );
}
