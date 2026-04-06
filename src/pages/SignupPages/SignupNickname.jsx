import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const SignupNickname = () => {
  const navigate = useNavigate();
  return (
    <>
      <p> SignupNickname</p>
      <img src="/icons/close.png" />
      <p>닉네임</p>
      <input type="text" placeholder="닉네임을 입력해주세요."></input>
      <br />

      <Button type="button" onClick={() => navigate("/signup/account")}>
        다음
      </Button>
    </>
  );
};

export default SignupNickname;
