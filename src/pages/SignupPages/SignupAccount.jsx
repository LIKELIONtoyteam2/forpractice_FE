import Button from "../../components/Button";
import Input from "../../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const SignupAccount = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, signupData, setSignupData, login } = useAuthStore(); //useAuthStore에서 signup, signupData 가져오기

  const handleSignup = async () => {
    setSignupData({ username: username, password: password, email: email });

    try {
      await signup(username, email, signupData.nickname, password);
      await login(username, password);
      navigate("/signup/complete");
    } catch (error) {
      // 에러 발생 시 새로고침 -> 입력된 거 날리기
      console.error(error);
      window.location.reload();
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-100.5 flex-col bg-white px-4">
      {/* 상단 헤더 */}
      <header className="relative flex items-center pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 p-1 text-gray-700"
        >
          {/* left chevron  */}
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
        <h1 className="font-main-SemiBold w-full text-center text-base text-gray-900">
          회원가입
        </h1>
      </header>

      <main className="mt-30 w-full space-y-6">
        {/* 아이디 섹션 */}
        <section className="space-y-2">
          <label className="font-main-Bold block text-sm text-gray-800">
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

        {/*이메일 섹션 */}
        <section className="space-y-2">
          <label className="font-main-Bold block text-sm text-gray-800">
            이메일
          </label>
          <Input
            className="h-11 w-full rounded-[99px] bg-gray-100 pl-6"
            type="text"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>

        {/* 비밀번호 섹션 */}
        <section className="mb-100">
          <label className="font-main-Bold block pb-2 text-sm text-gray-800">
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
              className="absolute top-1/2 right-3 w-5 -translate-y-1/2 cursor-pointer opacity-40"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </section>

        {/* 로그인 버튼  */}
        <div className="flex justify-center pb-10">
          <Button
            className="font-main-Bold flex h-15 w-87.5"
            onClick={handleSignup}
          >
            가입완료
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SignupAccount;
