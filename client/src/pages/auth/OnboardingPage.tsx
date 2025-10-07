import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginPage";
import RegisterForm from "./RegisterPage";

function FormWrapper({
  isActive,
  direction,
  children,
}: {
  isActive: boolean;
  direction: "left" | "right";
  children: React.ReactNode;
}) {
  const offset = direction === "left" ? -100 : 100;
  const sideClass =
    direction === "left"
      ? "absolute flex items-center justify-center -left-[2%] w-3/5"
      : "absolute flex items-center justify-center -right-[2%] w-3/5";

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={direction}
          initial={{ x: offset, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: offset, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className={sideClass}
        >
          <div className="w-full h-full flex items-center justify-center p-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SideContent({
  show,
  position,
  title,
  description,
  buttonText,
  onClick,
}: {
  show: boolean;
  position: "left" | "right";
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  const offset = position === "left" ? -100 : 100;
  const alignClass =
    position === "left"
      ? "absolute w-[34%] top-2/5 left-0 -translate-y-1/2 text-left pl-8 text-yellow-50"
      : "absolute w-[34%] top-2/5 right-0 -translate-y-1/2 text-right pr-8 text-yellow-50";

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={position}
          className={alignClass}
          initial={{ opacity: 0, x: offset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1 className="text-4xl font-bold pb-3">{title}</h1>
          <p className="text-lg">{description}</p>
          <button
            onClick={onClick}
            className="mt-6 px-8 py-2 bg-white border border-purple-700 text-purple-700 font-semibold rounded-full hover:bg-purple-50 transition"
          >
            {buttonText}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function OnboardingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 920);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    window.history.replaceState(null, "", isLogin ? "/register" : "/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-300 to-indigo-300 overflow-hidden px-4">
      {!isMobile ? (
        <div className="relative w-full max-w-5xl h-[720px] bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden flex">
          {/* form */}
          <div className="relative flex-1 h-full flex items-center justify-center w-full">
            <FormWrapper isActive={isLogin} direction="left">
              <LoginForm />
            </FormWrapper>
            <FormWrapper isActive={!isLogin} direction="right">
              <RegisterForm />
            </FormWrapper>
          </div>

          {/* background shape */}
          <motion.div
            className="absolute -top-2/5 -right-1/3 w-[150%] h-[101%] bg-purple-500 origin-bottom shadow-xl"
            initial={{ rotate: 75 }}
            animate={{
              rotate: isLogin ? 75 : -75,
              translateX: isLogin ? 0 : "-15%",
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* side content */}
          <SideContent
            show={isLogin}
            position="right"
            title="New here?"
            description="Tạo tài khoản và khám phá những công cụ giúp bạn học tập và cộng tác hiệu quả hơn."
            buttonText="Sign Up"
            onClick={toggleForm}
          />
          <SideContent
            show={!isLogin}
            position="left"
            title="Already have an account?"
            description="Đăng nhập để tiếp tục hành trình học tập và quản lý công việc của bạn."
            buttonText="Sign In"
            onClick={toggleForm}
          />
        </div>
      ) : (
        <div className="w-full max-w-md  bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden p-6 py-8">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="mt-4 text-center">
            {isLogin ? (
              <p className="text-center text-sm text-[var(--color-text-muted)]">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-[var(--color-primary)] font-semibold hover:underline"
                >
                  Register
                </button>
              </p>
            ) : (
              <p className="text-center text-sm text-[var(--color-text-muted)]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-[var(--color-primary)] font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
