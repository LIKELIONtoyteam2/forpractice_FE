import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Input from "../components/TextInput";
import { useState } from "react";
const MypageFix = () => {
  const navigate = useNavigate();
  const [Nickname, setNickname] = useState("");
  //currentUser 배열 꺼내기
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
        <p>{currentUser.nickname}</p>
        <p>@{currentUser.id}</p>

        <div style={{ border: "1px solid grey" }}>
          <p>{currentUser.nickname}</p>
          <Input
            type="text"
            value={Nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={"닉네임을 입력하세요"}
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
