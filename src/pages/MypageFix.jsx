import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Input from "../components/TextInput";
import { useState } from "react";
const MypageFix = () => {
  const navigate = useNavigate();
  const [Nickname, setNickname] = useState("");

  return (
    <>
      <header>
        마이페이지
        <Button type="button" onClick={() => navigate()}>
          저장
        </Button>
      </header>
      <main>
        <Button type="button">
          <img src="/icons/edit.svg" />
        </Button>
        <p>닉네임</p>
        <p>@아이디</p>

        <div style={{ border: "1px solid grey" }}>
          <p>닉네임</p>
          <Input
            type="text"
            value={Nickname}
            onChange={(e) => setNickname(e.target.value)}
          >
            <img src="/icons/close.png" />
          </Input>
          <Button type="button">
            <img src="/icons/close.svg" onClick={() => setNickname(" ")} />
          </Button>
        </div>
      </main>
    </>
  );
};

export default MypageFix;
