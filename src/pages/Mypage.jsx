import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const Mypage = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>마이페이지</header>
      <div>
        <p>닉네임</p>
        <p>@아이디</p>
      </div>
      <Button type="button" onClick={() => navigate("/mypagefix")}>
        프로필 편집하기
      </Button>
    </>
  );
};

export default Mypage;
