import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Preview from "../pages/MypageFix";

const Mypage = () => {
  const navigate = useNavigate();
  //currentUser 배열 꺼내기
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="flex flex-col items-center min-h-screen w-[490px] bg-white">
      <header className="w-full h-14 flex items-center justify-center font-bold text-lg border-b border-gray-100">
        마이페이지
      </header>

      {/* 프로필 컨텐츠 영역 */}
      <div className="flex flex-col  items-center w-full px-10 py-10">
        {/* 프로필 이미지 (원형) */}
        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-[#EAEAEA] flex items-center justify-center shadow-sm">
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
      </div>

      {/* 유저 정보 */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {currentUser.nickname}
        </h2>
        <p className="text-gray-500 text-sm mt-1">@{currentUser.id}</p>
      </div>

      {/* 버튼 영역 */}
      <div className="w-full mt-10">
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
