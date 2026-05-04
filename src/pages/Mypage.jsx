import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const Mypage = () => {
  const navigate = useNavigate();
  //currentUser 배열 꺼내기
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <header>마이페이지</header>
      <div>
        <p>{currentUser.nickname}</p>
        <p>@{currentUser.id}</p>
      </div>
      <Button type="button" onClick={() => navigate("/mypagefix")}>
        프로필 편집하기
      </Button>
    </>
  );
};

export default Mypage;
