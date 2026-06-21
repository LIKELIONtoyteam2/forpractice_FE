import Button from "../components/Button";
import Input from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(username, password);
    navigate("/signup/complete");
  };

  return (
    /* 전체를 중앙으로 정렬하는 컨테이너 */
    <div className="mx-auto flex min-h-screen w-100.5 flex-col items-center bg-white px-9 pt-20">
      {/* 로고 영역 */}
      <div className="mb-16">
        <img src="/icons/logo.svg" alt="Audit Logo" className="w-32" />
      </div>

      <main className="w-full space-y-6">
        {/* 아이디 섹션 */}
        <section className="space-y-2">
          <label className="font-main-ExtraBold block text-[16px] text-gray-800">
            아이디
          </label>
          <Input
            className="h-11 w-full rounded-[99px] bg-gray-100 pl-6"
            type="text"
            placeholder="아이디 입력"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </section>

        {/* 비밀번호 섹션 */}
        <section className="space-y-2">
          <label className="font-main-ExtraBold block text-[16px] text-gray-800">
            비밀번호
          </label>
          <div className="relative">
            <Input
              className="h-11 w-full rounded-[99px] bg-gray-100 pr-10 pl-6"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={
                showPassword ? "/icons/eye_opened.svg" : "/icons/eye_closed.svg"
              }
              alt="toggle password visibility"
              className="absolute top-1/2 right-6 w-5 -translate-y-1/2 cursor-pointer opacity-40"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* 로그인 상태 유지 */}
          <div className="mt-2 ml-2.5 flex items-center gap-2 text-[14px] text-gray-500">
            <input type="checkbox" className="accent-gray2 h-4 w-4" />
            <span className="font-main">로그인 상태 유지</span>
          </div>
        </section>

        {/* 로그인 버튼  */}
        <div className="pt-4">
          <Button
            className="font-main-Bold h-12.5 w-82.5 py-5 text-[18px]" // 화면 너비에 꽉 차게
            onClick={handleLogin}
          >
            로그인
          </Button>
        </div>

        {/* 회원가입*/}
        <div className="flex justify-center">
          <span
            onClick={() => navigate("/signup/nickname")}
            className="font-main text-gray3 cursor-pointer text-[14px] underline underline-offset-4 transition-colors hover:text-gray-600"
          >
            회원가입
          </span>
        </div>
      </main>
    </div>
  );
};

export default Login;
