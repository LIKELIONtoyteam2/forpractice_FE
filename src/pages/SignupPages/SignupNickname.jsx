import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/TextInput";

const SignupNickname = () => {
  const navigate = useNavigate();
  const [Nickname, setNickname] = useState("");

  return (
    <div className="mx-auto flex min-h-screen w-[490px] flex-col bg-white px-4">
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
      {/* [추가] 프로필 이미지 업로드 영역 (이미지 참고) */}
      <div className="flex justify-center pt-8 pb-10">
        <div className="relative">
          <div className="flex items-center justify-center rounded-full ">
            <img
              src="/images/defaultProfile.png"
              alt="기본 프로필"
              className="h-25 w-25 object-cover rounded-full"
            />
          </div>
          {/* [추가] 우측 하단 + 버튼 */}
          <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#7482FF] text-white shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="pb-10">
        <label className="block mb-2 text-sm font-bold text-black">
          닉네임
        </label>
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={Nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full bg-transparent outline-none text-base py-1 pr-8 placeholder:text-gray-300"
        ></Input>
      </div>
      <Button
        type="button"
        onClick={() => {
          localStorage.setItem("temp_nickname", Nickname);
          navigate("/signup/account");
        }}
        className="flex flex-col-reverse w-[450px] h-15 "
      >
        다음
      </Button>
    </div>
  );
};

export default SignupNickname;
