import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Input from "../../components/TextInput";
import { useAuthStore } from "../../store/useAuthStore";

const SignupNickname = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [Nickname, setNickname] = useState("");
  const [preview, setPreview] = useState("/images/defaultProfile.png"); //프로필 사진 입력용
  const [imageFile, setImageFile] = useState(null);
  const { setSignupData } = useAuthStore();

  //이미지 변경 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file); // 실제 이미지 파일 저장

    // 기존 생성된 blob URL 메모리 해제 (성능 최적화)
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);
    setPreview(url); // 화면 렌더링용 임시 URL 생성
  };

  //숨겨진 input 클릭
  const onEditClick = () => {
    fileInputRef.current.click();
  };

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
              src={preview}
              alt="기본 프로필"
              className="h-27 w-27 rounded-full object-cover"
            />
          </div>
          {/* 우측 하단 + 버튼 */}
          <button
            type="button"
            onClick={onEditClick} // 클릭 시 파일 input 클릭
            className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#7482FF] text-white transition-transform hover:scale-105"
          >
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

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
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
          className="font-main-Bold flex h-15 w-87.5"
          onClick={() => {
            if (!Nickname.trim()) {
              alert("닉네임을 입력해 주세요.");
              return;
            }

            setSignupData({
              nickname: Nickname,
              profileImage: imageFile,
            });

            console.log("스토어로 전송된 데이터:", {
              nickname: Nickname,
              profileImage: imageFile,
            });
            navigate("/signup/account");
          }}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default SignupNickname;
