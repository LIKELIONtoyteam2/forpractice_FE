import Input from "../components/TextInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useToastStore } from "../store/useToastStore";
//import { useAuthStore } from "../store/useAuthStore";
import { usePostStore } from "../store/usePostStore";

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [Preview, setPreview] = useState("/images/previewphoto.png");
  const showToast = useToastStore((state) => state.showToast);
  const { createPost } = usePostStore();

  const CATEGORIES = ["영양제", "화장품", "식품", "기타"];

  const [form, setForm] = useState({
    name: "",
    image: null,
    openedDate: "",
    expiryDate: "",
    category: "",
  });

  // 사진 선택 시 실행 - 파일 객체 그대로 저장
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 화면에 보여줄 미리보기 URL
    setPreview(URL.createObjectURL(file));

    setForm((prev) => ({ ...prev, image: file }));
  };

  // 입력값이 바뀔 때마다 form 상태 업데이트
  const handleChange = (e, field) => {
    const value = e.target.value;
    setForm({ ...form, [field]: value });
  };

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  // 2. 등록 버튼 클릭 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.expiryDate || !form.openedDate || !form.category) {
      alert("내용을 모두 입력해주세요!");
      return;
    }

    const formData = new FormData();

    // 백엔드 명세 Key 규칙 지키기!!!!!
    formData.append("title", form.name);
    formData.append("body", `카테고리: ${form.category}`);
    formData.append("gender", 1);
    formData.append("expiration_date", form.expiryDate);
    formData.append("open_date", form.openedDate);
    formData.append("hashtag_names", form.category);

    if (form.image) {
      formData.append("photo", form.image);
    }

    showToast("check", "제품이 등록됐습니다!");

    const success = await createPost(formData);

    if (success) {
      navigate("/productpage");
    }
  };

  return (
    <div className="font-main flex min-h-screen w-100.5 flex-col items-center bg-white px-4 py-6">
      <img className="mb-5 flex h-8 w-15 items-center" src="/icons/logo.svg" />

      {/* 사진 업로드 영역 */}
      <div className="mb-8 flex flex-col items-center">
        <div
          onClick={onUploadClick}
          className="mb-4 flex h-48 w-48 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-gray-100"
        >
          {Preview ? (
            <img
              src={Preview}
              alt="미리보기"
              className="h-full w-full object-cover"
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
          className="bg-primary font-main-Bold flex items-center gap-1 rounded-full px-6 py-2 text-sm text-white"
        >
          <img
            src="/icons/upload.svg"
            alt="upload"
            className="h-8 w-8 object-contain"
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
          <label className="font-main-Bold w-20 text-gray-800">제품명</label>
          <Input
            className="border-gray2 flex-1 rounded-full border px-4 py-2"
            onChange={(e) => handleChange(e, "name")}
            value={form.name}
          />
        </div>
        <div className="flex items-center">
          <label className="font-main-Bold w-20 text-gray-800">개봉일</label>
          <Input
            type="date"
            className="border-gray2 flex-1 rounded-full border px-4 py-2"
            onChange={(e) => handleChange(e, "openedDate")}
            value={form.openedDate}
          />
        </div>
        <div className="flex items-center">
          <label className="font-main-Bold w-20 text-gray-800">유통기한</label>
          <Input
            type="date"
            className="border-gray2 flex-1 rounded-full border px-4 py-2"
            onChange={(e) => handleChange(e, "expiryDate")}
            value={form.expiryDate}
          />
        </div>

        <div className="flex items-center">
          <label className="font-main-Bold w-20 text-gray-800">카테고리</label>
          <div className="relative flex flex-1 items-center">
            {" "}
            <select
              className="border-gray2 w-full appearance-none rounded-full border bg-transparent py-2 pr-10 pl-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => handleChange(e, "category")}
              value={form.category || "카테고리 선택"}
            >
              <option value="카테고리 선택" disabled>
                카테고리 선택
              </option>

              {/* 동적 렌더링 */}
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* chevron-down */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute right-4.5 h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            className="bg-primary font-main-Bold h-12.5 w-87.5 rounded-full py-4 text-lg text-white transition-colors"
          >
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
