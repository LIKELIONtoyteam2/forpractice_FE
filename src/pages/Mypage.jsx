import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Preview from "../pages/MypageFix";

const Mypage = () => {
  const navigate = useNavigate();
  //currentUser 배열 꺼내기
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="flex min-h-screen w-100.5 flex-col items-center bg-white">
      <header className="font-main-Bold flex h-14 w-full items-center justify-center border-b border-gray-100 text-lg">
        마이페이지
      </header>

      {/* 프로필 컨텐츠 영역 */}
      <div className="flex w-full flex-col items-center px-10 py-10">
        {/* 프로필 이미지 (원형) */}
        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#EAEAEA]">
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
      </div>

      {/* 유저 정보 */}
      <div className="mt-6 text-center">
        <h2 className="font-main-Bold text-2xl text-gray-900">
          {currentUser.nickname}
        </h2>
        <p className="mt-1 text-sm text-gray-500">@{currentUser.id}</p>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-10 w-full">
        <Button
          variant="primary"
          className="w-full py-4 text-lg" // 전체 너비 확장 및 패딩 조절
          onClick={() => navigate("/mypagefix")}
        >
          프로필 편집하기
        </Button>
      </div>
    </div>
  );
};

export default Mypage;
