import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { useNavigate } from "react-router-dom";
const SignupAccount = () => {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <section>
          <p>아이디</p>
          <TextInput type="text" placeholder="아이디 입력" />
        </section>

        <section>
          <p>비밀번호</p>
          <TextInput type="password" placeholder="비밀번호 입력" />
        </section>

        <Button type="button" onClick={() => navigate("/productpage")}>
          가입완료
        </Button>
      </main>
    </>
  );
};

export default SignupAccount;
