import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const SignupComplete = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary10 jusify-center mx-auto flex min-h-screen w-100.5 flex-col items-center px-4 py-6">
      <img
        src="/images/Ganadi.png"
        className="flex h-75 w-100 items-center rounded-full object-cover"
      />

      <div className="font-main-Bold mb-7 flex justify-center text-[24px]">
        가입을 축하합니다!
      </div>

      <div className="font-main mb-70 flex justify-center text-[20px]">
        새로운 재고를 관리하고 등록해봐요!
      </div>
      <div className="flex justify-center pb-10">
        <Button
          className="font-main-Bold flex h-15 w-87.5" // 화면 너비에 꽉 차게
          onClick={() => {
            navigate("/productpage");
          }}
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  );
};

export default SignupComplete;
