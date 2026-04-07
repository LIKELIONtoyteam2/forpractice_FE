import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/TextInput";

const SignupNickname = () => {
  const navigate = useNavigate();
  const [Nickname, setNickname] = useState("");

  return (
    <>
      <p>닉네임</p>
      <img src="/icons/close.png" onClick={() => setNickname(" ")} />
      <Input
        type="text"
        placeholder="닉네임을 입력해주세요."
        value={Nickname}
        onChange={(e) => setNickname(e.target.value)}
      ></Input>
      <br />

      <Button type="button" onClick={() => navigate("/signup/account")}>
        다음
      </Button>
    </>
  );
};

export default SignupNickname;
