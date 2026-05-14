import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/TextInput";

const SignupNickname = () => {
  const navigate = useNavigate();
  const [Nickname, setNickname] = useState("");

  return (
    <div className="mx-auto flex min-h-screen w-100.5 flex-col bg-none px-4">
      <header className="relative flex items-center pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 p-2.5 text-gray-700"
        >
          {/* 뒤로가기 chevron 아이콘 (SVG 인라인) */}
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
        <h1 className="font-main-Bold w-full text-center text-base text-black">
          회원가입
        </h1>
      </header>
      {/* [추가] 프로필 이미지 업로드 영역 (이미지 참고) */}
      <div className="flex justify-center pt-8 pb-10">
        <div className="relative">
          <div className="flex items-center justify-center rounded-full">
            <img
              src="/images/defaultProfile.png"
              alt="기본 프로필"
              className="h-27 w-27 rounded-full object-cover"
            />
          </div>
          {/* 우측 하단 + 버튼 */}
          <button className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#7482FF] text-white">
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
      {/* 닉네임 입력창 */}
      <div className="mb-112.5 pl-8">
        <label className="font-main-Bold mb-2 block text-[18px] text-black">
          닉네임
        </label>
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={Nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="placeholder:text-gray3 font-main w-full border-b bg-transparent p-2 text-[18px] outline-none"
        ></Input>
      </div>
      <div className="flex justify-center pb-10">
        <Button
          type="button"
          onClick={() => {
            localStorage.setItem("temp_nickname", Nickname);
            navigate("/signup/account");
          }}
          className="font-main-Bold flex h-15 w-87.5"
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default SignupNickname;
