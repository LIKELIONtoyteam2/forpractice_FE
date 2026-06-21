import Input from "../components/TextInput";
import Button from "../components/Button";
//import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useToastStore } from "../store/useToastStore";
import { useAuthStore } from "../store/useAuthStore";
import { usePostStore } from "../store/usePostStore";
//import api from "@api/axios";

const Register = () => {
  //const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [Preview, setPreview] = useState("/images/previewphoto.png");
  const showToast = useToastStore((state) => state.showToast);
  const { createPost } = usePostStore();
  const { isLoading } = useAuthStore();

  const [categories, setCategories] = useState(["영양제", "식품"]);

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
    const value = e.target.value;

    // 💡 [추가된 로직] 카테고리에서 "직접 추가"를 선택했을 때만 특별 처리
    if (field === "category" && value === "__ADD_NEW__") {
      const newCategory = prompt("새로운 카테고리 이름을 입력해주세요:");

      if (newCategory && newCategory.trim() !== "") {
        // 1. 중복이 아닐 때만 카테고리 배열 목록에 추가
        if (!categories.includes(newCategory)) {
          setCategories([...categories, newCategory]);
        }
        // 2. form 상태도 새로 만든 카테고리로 업데이트
        setForm({ ...form, category: newCategory });
      } else {
        // 취소하거나 빈 값을 넣었다면 기존 선택값 유지 (또는 초기화)
        e.target.value = form.category || "카테고리 선택";
      }
      return; // 특별 처리가 끝났으므로 함수를 종료합니다.
    }

    setForm({ ...form, [field]: value });
  };

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 비어있는 거 검사
    if (!form.name || !form.expiryDate || !form.openedDate || !form.category) {
      alert("내용을 모두 입력해주세요!");
      return;
    }

    showToast("check", "제품이 등록됐습니다!");

    // 💡 3. [데이터 가공] 현재 내 화면의 변수명을 백엔드 명세서 Key 이름으로 번역합니다.
    const PostData = {
      title: form.name, // 제품명
      body: `카테고리: ${form.category}`,
      gender: 1,
      expiration_date: form.expiryDate, // 유통기한
      open_date: form.openedDate, // 개봉일
      hashtag_names: [form.category], // 해시태그
      photo: null, // 이미지 파일 처리는 백엔드 구조에 맞춰 null 처리 혹은 form.image
    };

    // createPost 호출
    const success = await createPost(PostData);

    if (success) {
      showToast("check", "제품이 등록됐습니다!");
      // navigate("/productpage"); // 주석 해제하면 이동함
    }
  };

  return (
    <div className="font-main flex min-h-screen w-100.5 flex-col items-center bg-white px-4 py-6">
      <img className="mb-9 flex w-24 items-center" src="/icons/logo.svg" />

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
          <div className="relative flex-1">
            <select
              className="border-gray2 w-full appearance-none rounded-full border px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => handleChange(e, "category")}
              value={form.category || "카테고리 선택"}
            >
              <option value="카테고리 선택" disabled>
                카테고리 선택
              </option>

              {/* 동적으로 렌더링되는 옵션들 */}
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}

              <option value="__ADD_NEW__" className="font-bold text-indigo-600">
                +
              </option>
            </select>
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-500">
              ▼
            </span>
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
