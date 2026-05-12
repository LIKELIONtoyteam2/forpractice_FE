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
    <div className="flex flex-col items-center min-h-screen w-[490px] bg-white">
      <header className="relative w-full h-14 flex items-center justify-between px-4 font-bold text-lg border-b border-gray-100">
        {/* 왼쪽 공간 확보 */}
        <div className="w-10"></div>

        {/* 마이페이지 헤더*/}
        <h1 className="flex-1 text-center">마이페이지</h1>

        {/*  저장 버튼 */}
        <button
          type="button"
          onClick={() => handleProfile()}
          className="w-10 text-sm text-gray font-medium"
        >
          저장
        </button>
      </header>

      <main>
        <div className="flex flex-col w-[490px] items-center w-full">
          {/* 1. 배경 이미지 영역 */}
          <div className="relative  w-[490px] h-40 bg-[#f0f2f9]">
            {/* 배경 이미지 수정 버튼 */}
            <button
              onClick={onEditClick}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center "
            >
              <img src="/icons/edit.svg" alt="edit" className="w-6 h-6" />
            </button>

            {/* 2. 프로필 이미지 (배경에 걸쳐 있음) */}
            <div className="absolute left-1/2 -bottom-25 -translate-x-1/2">
              <div className="relative flex flex-col  items-center w-full px-10 py-10">
                {/* 프로필 이미지 (원형) */}
                <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-[#EAEAEA] flex items-center justify-center ">
                  {currentUser.profileImage ? (
                    <img
                      src={currentUser.profileImage}
                      alt="프로필"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* 이미지 없을 경우 */
                    <img
                      src="/images/defalutProfile.png"
                      alt="프로필"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* 프로필 이미지 수정 버튼 */}
                <button
                  onClick={onEditClick}
                  className="absolute top-10 right-10 w-7 h-7 bg-white rounded-full flex items-center justify-center  border-1.5 border-gray-100"
                >
                  <img src="/icons/edit.svg" alt="edit" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. 닉네임 및 아이디 정보 (프로필 이미지 아래 여백 필요) */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-[#1a1a1a]">
              {currentUser.nickname}
            </h2>
            <p className="text-gray-400 text-sm mt-1">@{currentUser.id}</p>
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

        <div className="w-full rounded-[20px] bg-primary10 mt-9 p-5">
          {/* 1. 라벨: 닉네임 */}
          <p className="mb-2 text-lg font-bold text-black">닉네임</p>

          {/* 2. 입력창 컨테이너 */}
          <div className="relative flex items-center">
            <Input
              type="text"
              defaultValue={Nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={currentUser.nickname}
              // 안쪽 입력창
              className="w-full rounded-full bg-primary40 py-3 pl-5 pr-12 outline-none"
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
