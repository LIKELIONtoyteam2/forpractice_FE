import Button from "../components/Button";
import Input from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => user.id === id && user.pw === pw);

    if (!foundUser) {
      alert("로그인 실패");
      setId("");
      setPw("");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    navigate("/productpage");
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
          <label className="block text-[16px] font-main-ExtraBold  text-gray-800">
            아이디
          </label>
          <Input
            className="w-full h-11 pl-6 bg-gray-100 rounded-[99px]"
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </section>

        {/* 비밀번호 섹션 */}
        <section className="space-y-2">
          <label className="block text-[16px] font-main-ExtraBold text-gray-800">
            비밀번호
          </label>
          <div className="relative">
            <Input
              className="w-full pr-10    h-11 pl-6 bg-gray-100 rounded-[99px]"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <img
              src={
                showPassword ? "/icons/eye_opened.svg" : "/icons/eye_closed.svg"
              }
              alt="toggle password visibility"
              className="absolute right-6 top-1/2 w-5 -translate-y-1/2 cursor-pointer opacity-40"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* 로그인 상태 유지 */}
          <div className="mt-2 ml-2.5 flex items-center gap-2 text-[14px] text-gray-500">
            <input type="checkbox" className="h-4 w-4 accent-gray2" />
            <span className="font-main">로그인 상태 유지</span>
          </div>
        </section>

        {/* 로그인 버튼  */}
        <div className="pt-4">
          <Button
            className="w-82.5 h-12.5 py-5 text-[18px] font-main-Bold" // 화면 너비에 꽉 차게
            onClick={handleLogin}
          >
            로그인
          </Button>
        </div>

        {/* 회원가입 (링크 텍스트 형태) */}
        <div className="flex justify-center">
          <span
            onClick={() => navigate("/signup/nickname")}
            className="cursor-pointer text-[14px] font-main text-gray3 underline underline-offset-4 transition-colors hover:text-gray-600"
          >
            회원가입
          </span>
        </div>
      </main>
    </div>
  );
};

export default Login;
