import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <p>Audit</p>
        <section>
          <p>아이디</p>
          <TextInput type="text" placeholder="아이디 입력" />
        </section>

        <section>
          <p>비밀번호</p>
          <TextInput type="password" placeholder="비밀번호 입력" />
          <p>로그인 유지 체크박스 넣어야됨</p>
        </section>

        <Button type="button">로그인</Button>
        <Button type="button" onClick={() => navigate("/signup/nickname")}>
          회원가입
        </Button>
      </main>
    </>
  );
};

export default Login;
