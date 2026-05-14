import Button from "../components/Button";
import Input from "../components/TextInput";
import Product from "../components/Product";
import { useState } from "react";
import Modal from "../components/Modal";

const ProductPage = () => {
  // 1. 현재 정렬 기준 상태 (기본값: 최신순)
  const [sortType, setSortType] = useState("latest");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const getDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    const diff = expiry - today; // 밀리초 차이
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return Math.max(daysLeft, 0);
  };

  // 정렬 함수
  const getSortedProducts = () => {
    // 원본 배열을 복사해서 정렬
    const copy = [...products];

    if (sortType === "latest") {
      // 최신 등록순 (id가 클수록 최신)
      return copy.sort((a, b) => b.id - a.id);
    } else if (sortType === "expiry") {
      // 유통기한 임박순 (남은 날짜가 적을수록 위로?)
      return copy.sort((a, b) => {
        const aDaysLeft = getDaysLeft(a.expiryDate);
        const bDaysLeft = getDaysLeft(b.expiryDate);
        console.log(aDaysLeft, bDaysLeft);
        return aDaysLeft - bDaysLeft;
      });
    } else if (sortType === "category") {
      // 카테고리순 (가나다순)
      return copy.sort((a, b) => a.category.localeCompare(b.category));
    }
    return copy;
  };

  const sortedProducts = getSortedProducts();

  return (
    /* 전체 컨테이너를 모바일 너비로 제한하고 중앙 정렬 */
    <div className="bg-primary10 mx-auto min-h-screen w-100.5 px-4 py-6">
      {/* 로고 & 검색창 */}
      <div className="flex flex-col items-center gap-4">
        <img
          src="/icons/logo.svg"
          alt="logo"
          className="flex h-8 w-15 items-center"
        />

        <div className="flex items-center gap-2 rounded-xl bg-gray-100 p-3">
          <img
            className="h-5 w-5 opacity-50"
            src="./icons/search.svg"
            alt="search"
          />
          <Input
            className="h-10 w-90 bg-transparent outline-none"
            type="text"
            placeholder="검색"
          />
        </div>
      </div>

      {/* 정렬 필터 (가로 스크롤 가능하게 처리) */}
      <div className="mt-6 flex justify-center gap-2 pb-2">
        <Button
          onClick={() => setSortType("default")}
          active={sortType === "default"}
          className="font-main-Regular text-[14px]"
        >
          전체
        </Button>
        <Button
          onClick={() => setSortType("latest")}
          active={sortType === "latest"}
          className="font-main-Regular text-[14px]"
        >
          최신 등록순
        </Button>
        <Button
          onClick={() => setSortType("expiry")}
          active={sortType === "expiry"}
          className="font-main-Regular text-[14px]"
        >
          유통기한 임박순
        </Button>
        <Button
          onClick={() => setSortType("category")}
          active={sortType === "category"}
          className="font-main-Regular text-[14px]"
        >
          카테고리별
        </Button>
      </div>

      {/* 상품 그리드 */}
      <div className="mt-4 grid grid-cols-3 gap-x-3 gap-y-6">
        {sortedProducts.map((item, index) => {
          // 1. 현재 아이템이 몇 번째 줄인지 계산
          const rowIndex = Math.floor(index / 3);

          // 2. 줄 번호를 3으로 나눈 나머지로 색상 결정 (0, 1, 2 반복)
          const rowColors = [
            "bg-danger", // 1번째 줄 (index 0, 1, 2)
            "bg-warning", // 2번째 줄 (index 3, 4, 5)
            "bg-success", // 3번째 줄 (index 6, 7, 8)
          ];
          return (
            <Product
              key={item.id}
              {...item}
              daysLeft={getDaysLeft(item.expiryDate)}
              onClick={() => setSelectedProduct(item)}
              bgColor={rowColors[rowIndex % 3]}
            />
          );
        })}
      </div>

      {/* 상세 정보 모달  */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div className="flex flex-col items-center">
            <div className="h-48 w-full overflow-hidden rounded-2xl border bg-gray-50">
              <img
                className="h-full w-full object-cover"
                src={selectedProduct.image}
                alt="product"
              />
            </div>
            <div className="mt-6 w-full space-y-3 text-sm">
              <div className="mt-1.5">
                <span className="font-main-SemiBold">제품명 </span>

                <span>{selectedProduct.name}</span>
              </div>
              <div className="mt-1.5">
                <span className="font-main-SemiBold">개봉일 </span>

                <span>{selectedProduct.opendDate}</span>
              </div>

              <div className="mt-1.5">
                <span className="font-main-SemiBold">유통기한 </span>

                <span>{selectedProduct.expiryDate}</span>
              </div>

              <div className="mt-1.5">
                <span className="font-main-SemiBold">카테고리 </span>

                <span>{selectedProduct.category}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductPage;
