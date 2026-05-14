import Button from "../components/Button";
import Input from "../components/TextInput";
import { useState, useRef } from "react";

const MypageFix = () => {
  //currentUser 가져오기
  const [currentUser, setcurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || {};
  });

  const fileInputRef = useRef(null);
  const [Preview, setPreview] = useState(currentUser.profileImage);

  //currentUser의 Nickname 초기값을 설정
  const [Nickname, setNickname] = useState(
    JSON.parse(localStorage.getItem("currentUser"))?.nickname || "",
  );

  const handleProfile = () => {
    const updatedUser = {
      ...currentUser,
      nickname: Nickname,
      profileImage: Preview,
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setcurrentUser(updatedUser);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    //임시 사진 주소. 새로고침하면 사라짐 -> 이후에 api 서버 연결해서 유지하기
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const onEditClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex min-h-screen w-100.5 flex-col items-center bg-white">
      <header className="font-main-Bold relative flex h-14 w-full items-center justify-between border-b border-gray-100 px-4 text-lg">
        {/* 왼쪽 공간 확보 */}
        <div className="w-10"></div>

        {/* 마이페이지 헤더*/}
        <h1 className="flex-1 text-center">마이페이지</h1>

        {/*  저장 버튼 */}
        <button
          type="button"
          onClick={() => handleProfile()}
          className="text-gray font-main-Regular w-10 text-sm"
        >
          저장
        </button>
      </header>

      <main>
        <div className="flex w-100.5 flex-col items-center">
          {/* 1. 배경 이미지 영역 */}
          <div className="relative h-40 w-100.5 bg-[#f0f2f9]">
            {/* 배경 이미지 수정 버튼 */}
            <button
              onClick={onEditClick}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
            >
              <img src="/icons/edit.svg" alt="edit" className="h-6 w-6" />
            </button>

            {/* 2. 프로필 이미지 (배경에 걸쳐 있음) */}
            <div className="absolute -bottom-25 left-1/2 -translate-x-1/2">
              <div className="relative flex w-full flex-col items-center px-10 py-10">
                {/* 프로필 이미지 (원형) */}
                <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#EAEAEA]">
                  {currentUser.profileImage ? (
                    <img
                      src={currentUser.profileImage}
                      alt="프로필"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    /* 이미지 없을 경우 */
                    <img
                      src="/images/defalutProfile.png"
                      alt="프로필"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                {/* 프로필 이미지 수정 버튼 */}
                <button
                  onClick={onEditClick}
                  className="border-1.5 absolute top-10 right-10 flex h-7 w-7 items-center justify-center rounded-full border-gray-100 bg-white"
                >
                  <img src="/icons/edit.svg" alt="edit" className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. 닉네임 및 아이디 정보 (프로필 이미지 아래 여백 필요) */}
          <div className="mt-20 text-center">
            <h2 className="font-main-Bold text-[24px]">
              {currentUser.nickname}
            </h2>
            <p className="mt-3 text-[14px] text-gray-400">@{currentUser.id}</p>
          </div>

          {/* 숨겨진 파일 인풋 */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>

        <div className="bg-primary10 mt-9 w-full rounded-[20px] p-5">
          {/* 1. 라벨: 닉네임 */}
          <p className="font-main-Bold mb-4 text-[18px] text-black">닉네임</p>

          {/* 2. 입력창 컨테이너 */}
          <div className="relative flex items-center">
            <Input
              type="text"
              defaultValue={Nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={currentUser.nickname}
              // 안쪽 입력창
              className="bg-primary40 h-11 w-full rounded-full py-3 pr-12 pl-5 outline-none"
            />

            {/* 3. 삭제 버튼*/}
            {Nickname && (
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
