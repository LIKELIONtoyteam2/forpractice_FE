import Button from "../../components/Button";
import Input from "../../components/TextInput";
import { useNavigate } from "react-router-dom";
const SignupAccount = () => {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <section>
          <p>아이디</p>
          <Input type="text" placeholder="아이디 입력" />
        </section>

        <section>
          <p>비밀번호</p>
          <Input type="password" placeholder="비밀번호 입력" />
        </section>

        <Button type="button" onClick={() => navigate("/productpage")}>
          가입완료
        </Button>
      </main>
    </>
  );
};

export default SignupAccount;
