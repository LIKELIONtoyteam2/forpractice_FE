import Button from "../components/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Preview from "../pages/MypageFix";
import { useAuthStore } from "../store/useAuthStore";

const Mypage = () => {
  const navigate = useNavigate();

  const { user, fetchProfile, isLoading } = useAuthStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading && !user) {
    return (
      <div className="font-main-Bold flex min-h-screen items-center justify-center">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-100.5 flex-col items-center bg-white">
      <header className="font-main-Bold flex h-14 w-full items-center justify-center border-b border-gray-100 text-lg">
        마이페이지
      </header>

      <main>
        <div className="flex w-100.5 flex-col items-center">
          {/* 1. 배경 이미지 영역 */}
          <div className="relative h-40 w-100.5 bg-[#f0f2f9]">
            {/* 2. 프로필 이미지 (배경에 걸쳐 있음) */}
            <div className="absolute -bottom-25 left-1/2 -translate-x-1/2">
              <div className="relative flex w-full flex-col items-center px-10 py-10">
                {/* 프로필 이미지 (원형) */}
                <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#EAEAEA]">
                  {user.profile_image ? (
                    // 백엔드 주소와 받아온 경로를 조립해서 src에 넣기. base주소 / 백엔드 변수명 매치
                    <img
                      src={`https://bailey44.pythonanywhere.com${user.profile_image}`}
                      alt="프로필 사진"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    // 기본 이미지 경로
                    <img
                      src="/images/defaultProfile.png"
                      alt="기본 프로필"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. 닉네임 및 아이디 정보 (프로필 이미지 아래 여백 필요) */}
          <div className="mt-20 text-center">
            <h2 className="font-main-Bold text-[24px]">{user.nickname}</h2>
            <p className="mt-3 text-[14px] text-gray-400">@{user.username}</p>
          </div>
        </div>
      </main>

      {/* 버튼 영역 */}
      <div className="mt-10 h-12.5 w-87.5 items-center">
        <Button
          variant="primary"
          className="font-main-SemiBold h-12.5 w-87.5 py-4 text-[18px]"
          onClick={() => navigate("/mypagefix")}
        >
          프로필 편집하기
        </Button>
      </div>
    </div>
  );
};

export default Mypage;
