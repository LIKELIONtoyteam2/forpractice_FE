import Button from "../components/Button";
import Input from "../components/TextInput";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const MypageFix = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { user, updateProfile } = useAuthStore();

  // 입력 필드 및 이미지 상태 관리
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [preview, setPreview] = useState(
    user?.profile_image
      ? `https://bailey44.pythonanywhere.com${user.profile_image}`
      : "/images/defaultProfile.png",
  );
  const [imageFile, setImageFile] = useState(null); // 실제 서버로 보낼 파일 객체 저장

  // 저장 버튼 눌렀을 때 실행되는 함수
  const handleProfileSave = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해 주세요.");
      return;
    }

    // 스토어의 수정 액션 호출 (닉네임과 선택한 파일 객체를 넘김)
    const success = await updateProfile(nickname, imageFile);
    if (success) {
      navigate("/mypage"); // 수정 성공 시 마이페이지로 이동
    }
  };

  // 이미지 변경 시 호출되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file); // 실제 사진파일

    const url = URL.createObjectURL(file);
    setPreview(url); // 화면에 띄울 임시 프리뷰 주소
  };

  const onEditClick = () => {
    fileInputRef.current.click();
  };

  // 비로그인 상태 예외 처리
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        로그인이 필요합니다.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-100.5 flex-col items-center bg-white">
      <header className="font-main-Bold relative flex h-14 w-full items-center justify-between border-b border-gray-100 px-4 text-lg">
        <div className="w-10"></div>
        <h1 className="flex-1 text-center">마이페이지</h1>

        {/* 저장 버튼 */}
        <button
          type="button"
          onClick={handleProfileSave}
          className="text-gray font-main-Regular w-10 text-sm hover:text-black"
        >
          저장
        </button>
      </header>

      <main>
        <div className="flex w-100.5 flex-col items-center">
          {/* 1. 배경 이미지 영역 */}
          <div className="relative h-40 w-100.5 bg-[#f0f2f9]">
            <button
              onClick={onEditClick}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <img src="/icons/edit.svg" alt="edit" className="h-6 w-6" />
            </button>

            {/* 2. 프로필 이미지 */}
            <div className="absolute -bottom-25 left-1/2 -translate-x-1/2">
              <div className="relative flex w-full flex-col items-center px-10 py-10">
                <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#EAEAEA]">
                  {/* 💡 preview 상태값(이미지 주소)을 적용합니다 */}
                  <img
                    src={preview}
                    alt="프로필"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* 프로필 이미지 수정 버튼 */}
                <button
                  onClick={onEditClick}
                  className="border-1.5 absolute top-10 right-10 flex h-7 w-7 items-center justify-center rounded-full border-gray-100 bg-white shadow-sm"
                >
                  <img src="/icons/edit.svg" alt="edit" className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. 상단 실시간 변경 상태 레이아웃 (선택 사항) */}
          <div className="mt-20 text-center">
            <h2 className="font-main-Bold text-[24px]">
              {nickname || "닉네임 없음"}
            </h2>
            <p className="mt-3 text-[14px] text-gray-400">
              @{user.username || user.id}
            </p>
          </div>

          {/* 숨겨진 파일 인풋 */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>

        {/* 닉네임 변경 폼 */}
        <div className="bg-primary10 mt-9 items-center justify-center rounded-[20px] p-5">
          <p className="font-main-Bold mb-4 text-[18px] text-black">닉네임</p>

          <div className="relative flex items-center">
            <Input
              type="text"
              value={nickname} // 💡 defaultValue 대신 제어 컴포넌트(value) 활용
              onChange={(e) => setNickname(e.target.value)}
              placeholder="변경할 닉네임을 입력하세요"
              className="bg-primary40 h-11 w-full rounded-full py-3 pr-12 pl-5 outline-none"
            />

            {/* 글자 삭제 버튼 */}
            {nickname && (
              <button
                type="button"
                onClick={() => setNickname("")}
                className="absolute right-4 flex items-center justify-center"
              >
                <img
                  src="/icons/close.svg"
                  alt="clear"
                  className="h-5 w-5 opacity-60"
                />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MypageFix;
