import Button from "../components/Button";
import Input from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <main>
        <img src="/icons/logo.svg" />
        <section>
          <p>아이디</p>
          <Input type="text" placeholder="아이디 입력" />
        </section>

        <section>
          <span>
            <p>비밀번호</p>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 입력"
            />
            <img
              src={
                showPassword ? "/icons/eye_opened.svg" : "/icons/eye_closed.svg"
              }
              // 현재 상태 반전시키는 코드
              onClick={() => setShowPassword(!showPassword)}
            />
          </span>
          <br />
          <Input type="checkbox"></Input>
          <span>로그인 상태 유지</span>
        </section>

        <Button type="button">로그인</Button>
        {/*  정보 서버로 전송 로직 */}
        <Button type="button" onClick={() => navigate("/signup/nickname")}>
          회원가입
        </Button>
      </main>
    </>
  );
};

export default Login;
