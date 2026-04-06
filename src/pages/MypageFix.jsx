import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
const MypageFix = () => {
  const navigate = useNavigate();
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
          <TextInput type="text">
            <img src="/icons/close.png" />
          </TextInput>
          <Button type="button">
            <img src="/icons/close.svg" />
          </Button>
        </div>
      </main>
    </>
  );
};

export default MypageFix;
