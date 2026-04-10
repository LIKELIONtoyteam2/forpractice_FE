import Button from "../../components/Button";
import Input from "../../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupAccount = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSignup = () => {
    const nickname = localStorage.getItem("temp_nickname");
    console.log("temp_nickname");

    const newUser = {
      nickname,
      id,
      pw,
    };

    // users 배열에서 데이터 가져오고 없으면 빈 배열로 시작
    const users = JSON.parse(localStorage.getItem("users")) || [];
    //newUser를 users 배열에 push
    users.push(newUser);
    //그걸 localStorage에 stringify해서 집어넣음 (배열 통째로 업데이트)
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
  };
  return (
    <>
      <main>
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
          <p>비밀번호</p>
          <Input
            type="password"
            placeholder="비밀번호 입력"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </section>

        <Button
          type="button"
          onClick={() => {
            navigate("/productpage");
            handleSignup();
          }}
        >
          가입완료
        </Button>
      </main>
    </>
  );
};

export default SignupAccount;
