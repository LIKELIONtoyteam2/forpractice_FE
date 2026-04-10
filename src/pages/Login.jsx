import Button from "../components/Button";
import Input from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    //users 가져옴 (없으면 빈 배열)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    //입력한 정보가 users에 있는지 검증 하고
    //없으면 undefined, 있으면 해당 요소 반환
    const foundUser = users.find((user) => user.id === id && user.pw === pw);

    //로그인 실패 처리
    if (!foundUser) {
      alert("로그인 실패");
      return;
    }

    // 로그인한 유저 정보를 문자열로 변환해서 localStorage에 저장
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    console.log(users);
    console.log("로그인 성공 유저:", foundUser);
  };

  return (
    <>
      <main>
        <img src="/icons/logo.svg" />
        <section>
          <p>아이디</p>
          <Input
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </section>

        <section>
          <span>
            <p>비밀번호</p>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
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

        <Button
          type="button"
          onClick={() => {
            handleLogin();
            navigate("/productpage");
          }}
        >
          로그인
        </Button>

        <Button type="button" onClick={() => navigate("/signup/nickname")}>
          회원가입
        </Button>
      </main>
    </>
  );
};

export default Login;
