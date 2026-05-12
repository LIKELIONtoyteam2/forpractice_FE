import Input from "../components/TextInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [Preview, setPreview] = useState("/images/previewphoto.png");
  const [form, setForm] = useState({
    name: "",
    image: null,
    openedDate: "",
    expiryDate: "",
    category: "",
  });

  // 사진 선택 시 실행 - FileReader 통해 휘발 안되게
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // 파일 읽기가 완료되면 실행
    reader.onloadend = () => {
      const base64String = reader.result; // 이미지를 문자열로 변환
      setPreview(base64String); // 화면 미리보기 업데이트
      setForm((prev) => ({ ...prev, image: base64String })); // form 상태에 이미지 데이터 저장
    };

    reader.readAsDataURL(file); // 읽기 시작
  };

  // 입력값이 바뀔 때마다 form 상태 업데이트
  const handleChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value });
  };
  const onUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 비어있는 거 검사
    if (!form.name || !form.expiryDate || !form.openedDate || !form.category) {
      alert("내용을 모두 입력해주세요!");
      return;
    }
    //기존 데이터 가져오기
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // 새 객체 만들기
    const newProduct = {
      ...form,
      id: Date.now(),
    };

    // 저장
    localStorage.setItem(
      "products",
      JSON.stringify([...existingProducts, newProduct]),
    );

    navigate("/productpage");
  };

  return (
    <div className="flex flex-col items-center w-[490px] min-h-screen bg-white px-4 py-6 font-sans">
      <img className="flex w-24 mb-9 items-center" src="/icons/logo.svg" />

      {/* 사진 업로드 영역 */}
      <div className="flex flex-col items-center mb-8">
        <div
          onClick={onUploadClick}
          className="w-48 h-48 bg-gray-100 rounded-3xl flex items-center justify-center overflow-hidden border border-gray-200 cursor-pointer mb-4"
        >
          {Preview ? (
            <img
              src={Preview}
              alt="미리보기"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/icons/image-placeholder.svg"
              alt="placeholder"
              className="w-12 opacity-30"
            />
          )}
        </div>
        <button
          onClick={onUploadClick}
          className="flex items-center gap-1 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-md"
        >
          <img
            src="/icons/upload.svg"
            alt="upload"
            className="w-8 h-8 object-contain"
          />
          업로드
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* 폼 입력 영역 */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center">
          <label className="w-20 font-bold text-gray-800">제품명</label>
          <Input
            placeholder="제품명을 입력해주세요"
            className="flex-1 rounded-full border-gray-300"
            onChange={(e) => handleChange(e, "name")}
          />
        </div>

        <div className="flex items-center">
          <label className="w-20 font-bold text-gray-800">개봉일</label>
          <Input
            type="date"
            className="flex-1 rounded-full border-gray-300"
            onChange={(e) => handleChange(e, "openedDate")}
          />
        </div>

        <div className="flex items-center">
          <label className="w-20 font-bold text-gray-800">유통기한</label>
          <Input
            type="date"
            className="flex-1 rounded-full border-gray-300"
            onChange={(e) => handleChange(e, "expiryDate")}
          />
        </div>

        <div className="flex items-center">
          <label className="w-20 font-bold text-gray-800">카테고리</label>
          <div className="flex-1 relative">
            <select
              className="w-full border border-gray-300 rounded-full py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => handleChange(e, "category")}
              defaultValue="영양제"
            >
              <option value="영양제">영양제 ✕</option>
              <option value="식품">식품</option>
              <option value="화장품">화장품</option>
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </span>
          </div>
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            className="w-full bg-primary  text-white py-4 rounded-2xl text-lg font-bold transition-colors"
          >
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
