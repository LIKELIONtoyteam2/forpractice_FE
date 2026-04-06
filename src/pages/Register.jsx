import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <img src="/icons/logo.svg" />
      <div style={{ backgroundColor: "grey", width: "100px", height: "100px" }}>
        이미지 미리보기 박스
      </div>

      <Button type="button">
        <img src="/icons/upload.svg" />
        업로드
      </Button>

      <p>제품명</p>
      <TextInput type="text"></TextInput>
      <p>개봉일</p>
      <TextInput type="date"></TextInput>
      <p>유통기한</p>
      <TextInput type="date"></TextInput>
      <p>카테고리</p>
      <TextInput type="text"></TextInput>

      <Button type="button" onClick={() => navigate("/productpage")}>
        {/* 배열 추가 함수 작성 필요 */}
        등록하기
      </Button>
      <br />
    </>
  );
};

export default Register;
