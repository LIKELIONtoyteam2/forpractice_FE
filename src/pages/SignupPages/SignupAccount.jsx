import Button from "../../components/Button";
import Input from "../../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupAccount = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    const nickname = localStorage.getItem("temp_nickname");
    console.log("temp_nickname");

    const newUser = {
      nickname,
      id,
      pw,
    };

    // users 배열에서 데이터 가져오고 없으면 빈 배열로 시작
    const users = JSON.parse(localStorage.getItem("users")) || [];
    //newUser를 users 배열에 push
    users.push(newUser);
    //그걸 localStorage에 stringify해서 집어넣음 (배열 통째로 업데이트)
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
  };
  return (
    <div className="mx-auto flex min-h-screen w-100 flex-col bg-white px-4">
      {/* [추가] 상단 뒤로가기 + 타이틀 헤더 (이미지 참고) */}
      <header className="flex items-center pt-6 pb-2 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 p-1 text-gray-700"
        >
          {/* [추가] 뒤로가기 chevron 아이콘 (SVG 인라인) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="w-full text-center text-base font-semibold text-gray-900">
          회원가입
        </h1>
      </header>

      <main className="w-full mt-30 space-y-6">
        {/* 아이디 섹션 */}
        <section className="space-y-2">
          <label className="block text-sm font-extrabold  text-gray-800">
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
          <label className="block text-sm font-extrabold text-gray-800">
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
              className="absolute right-3 top-1/2 w-5 -translate-y-1/2 cursor-pointer opacity-40"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* 로그인 상태 유지 */}
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" className="h-4 w-4 accent-[#7482FF]" />
            <span>로그인 상태 유지</span>
          </div>
        </section>
        {/* 로그인 버튼  */}
        <div className="pt-4">
          <Button
            className="w-full py-4 text-lg" // 화면 너비에 꽉 차게
            onClick={() => {
              navigate("/productpage");
              handleSignup();
            }}
          >
            로그인
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SignupAccount;
