import Button from "../components/Button";
import Input from "../components/TextInput";
import Product from "../components/Product";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { usePostStore } from "../store/usePostStore";

const ProductPage = () => {
  const {
    posts,
    loading,
    fetchPosts,
    fetchPostDetail,
    currentPost,
    clearCurrentPost,
  } = usePostStore();
  const [sortType, setSortType] = useState("latest");

  // Modal 열림/닫힘
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const products = posts || [];

  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return Infinity; // 날짜 데이터가 없으면 맨 뒤로 보내기 위해 무한대 반환

    const today = new Date();
    // 1. 오늘의 시, 분, 초, 밀리초를 모두 0으로 리셋 (순수 날짜만 남김)
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(expiryDate);
    // 2. 유통기한의 시, 분, 초, 밀리초도 모두 0으로 리셋
    expiry.setHours(0, 0, 0, 0);

    // 3. 밀리초 차이를 하루(ms)로 나누고, 소수점을 버림(Math.floor)하여 정확한 일수 계산
    const diff = expiry - today;
    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));

    // 4. 유통기한이 지난 상품은 음수(-1, -2 등)가 그대로 나와야 임박순 정렬이 제대로 됩니다!
    return daysLeft;
  };

  // 정렬 함수
  const getSortedProducts = () => {
    if (!products || !Array.isArray(products) || products.length === 0) {
      return [];
    }

    // 원본 배열을 복사해서 정렬
    const copy = [...products];

    if (sortType === "latest") {
      // 최신 등록순 (id가 클수록 최신)
      return copy.sort((a, b) => b.id - a.id);
    } else if (sortType === "expiry") {
      // 유통기한 임박순 (남은 날짜가 적을수록 위로?)
      return copy.sort((a, b) => {
        const aDaysLeft = getDaysLeft(a.expiration_date || a.expiryDate);
        const bDaysLeft = getDaysLeft(b.expiration_date || b.expiryDate);
        return aDaysLeft - bDaysLeft;
      });
    } else if (sortType === "category") {
      // 카테고리순 (가나다순)
      return copy.sort((a, b) => {
        // a와 b 상품 각각의 해시태그에서 이름을 추출 (없으면 빈 문자열)
        const aCategory = a.hashtags?.[0]?.name || a.category || "";
        const bCategory = b.hashtags?.[0]?.name || b.category || "";

        return aCategory.localeCompare(bCategory);
      });
    }
    return copy;
  };

  // 카테고리별 분류 함수
  const getGroupedProducts = () => {
    const sorted = getSortedProducts();
    const groups = {};

    sorted.forEach((product) => {
      let categoryName = "default"; // 기본값 지정

      if (
        product.hashtags &&
        Array.isArray(product.hashtags) &&
        product.hashtags.length > 0
      ) {
        categoryName = product.hashtags[0].name; // 예: '식품'
      } else if (product.category) {
        categoryName = product.category; // 혹시 나중에 category 필드가 생길 때를 대비한 백업
      }

      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(product);
    });

    return groups;
  };

  const sortedProducts = getSortedProducts();

  // 상세정보 클릭
  const handleProductClick = (id) => {
    setIsModalOpen(true);
    fetchPostDetail(id);
  };

  // 모달 닫을 때
  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCurrentPost(); // 보고 있던 상세 데이터 비우기 (다음 모달에서 이전 데이터가 잠깐 보이는 현상 방지)
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-100.5 bg-white px-4 py-6">
      {/* 로고 & 검색창 */}
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          src="/icons/logo.svg"
          alt="logo"
          className="flex h-8 w-15 items-center"
        />

        <div className="bg-gray1 flex w-90 items-center gap-2 rounded-xl">
          <img
            className="ml-2.5 h-5 w-5 opacity-50"
            src="./icons/search.svg"
            alt="search"
          />
          <Input
            className="font-main h-10 w-90 bg-transparent outline-none"
            type="text"
            placeholder="검색"
          />
        </div>
      </div>

      {/* 정렬 필터 */}
      <div className="mt-6 flex justify-center gap-2 pb-2">
        <Button
          onClick={() => setSortType("default")}
          variant={sortType === "default" ? "primary" : "secondary"}
          className="font-main-Regular px-3 py-1.5 text-[14px]"
        >
          전체
        </Button>

        <Button
          onClick={() => setSortType("latest")}
          variant={sortType === "latest" ? "primary" : "secondary"}
          className="font-main-Regular px-3 py-1.5 text-[14px]"
        >
          최신 등록순
        </Button>

        <Button
          onClick={() => setSortType("expiry")}
          variant={sortType === "expiry" ? "primary" : "secondary"}
          className="font-main-Regular px-3 py-1.5 text-[14px]"
        >
          유통기한 임박순
        </Button>

        <Button
          onClick={() => setSortType("category")}
          variant={sortType === "category" ? "primary" : "secondary"}
          className="font-main-Regular px-3 py-1.5 text-[14px]"
        >
          카테고리별
        </Button>
      </div>

      {/* 카테고리별 분류 */}
      <div className="mt-4">
        {sortType === "category" ? (
          Object.entries(getGroupedProducts()).map(
            ([categoryName, groupProducts]) => (
              <div key={categoryName} className="mb-8">
                <div className="mb-3 flex items-center gap-1">
                  <span className="font-main-Bold text-[16px] text-gray-800">
                    {categoryName}
                  </span>

                  <svg
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* 해당 카테고리 상품 전용 그리드 */}
                <div className="grid grid-cols-3 gap-x-3 gap-y-6">
                  {groupProducts.map((item, index) => {
                    const rowIndex = Math.floor(index / 3);
                    const rowColors = [
                      { bg: "bg-pink", border: "border-pink" },
                      { bg: "bg-yellow", border: "border-yellow" },
                      { bg: "bg-green", border: "border-green" },
                    ];

                    return (
                      <Product
                        key={item.id}
                        id={item.id}
                        name={item.title}
                        image={
                          item.photo
                            ? `https://bailey44.pythonanywhere.com${item.photo}`
                            : null
                        }
                        daysLeft={getDaysLeft(item.expiration_date)}
                        onClick={() => handleProductClick(item.id)}
                        bgColor={rowColors[rowIndex % 3].bg}
                        borderColor={rowColors[rowIndex % 3].border}
                      />
                    );
                  })}
                </div>
              </div>
            ),
          )
        ) : (
          <div className="grid grid-cols-3 gap-x-3 gap-y-6">
            {sortedProducts.map((item, index) => {
              const rowIndex = Math.floor(index / 3);
              const rowColors = [
                { bg: "bg-pink", border: "border-pink" },
                { bg: "bg-yellow", border: "border-yellow" },
                { bg: "bg-green", border: "border-green" },
              ];
              return (
                <Product
                  key={item.id}
                  id={item.id}
                  name={item.title}
                  image={
                    item.photo
                      ? `https://bailey44.pythonanywhere.com${item.photo}`
                      : null
                  }
                  daysLeft={getDaysLeft(item.expiration_date)}
                  onClick={() => handleProductClick(item.id)}
                  bgColor={rowColors[rowIndex % 3].bg}
                  borderColor={rowColors[rowIndex % 3].border}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* 상세 정보 모달 */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {currentPost ? (
          <div className="flex flex-col items-center">
            <div className="h-48 w-full overflow-hidden rounded-2xl border bg-gray-50">
              <img
                className="h-full w-full object-cover"
                src={
                  currentPost.photo
                    ? `https://bailey44.pythonanywhere.com${currentPost.photo}`
                    : "/images/previewphoto.png"
                }
                alt="product"
              />
            </div>

            <div className="mt-6 w-full space-y-3 text-sm">
              <div className="mt-1.5 flex flex-wrap gap-8">
                <span className="font-main-SemiBold">제품명 </span>
                <span className="font-main-Regular text-gray3">
                  {currentPost.title}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-8">
                <span className="font-main-SemiBold">개봉일 </span>
                <span className="font-main-Regular text-gray3">
                  {currentPost.open_date}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-5">
                <span className="font-main-SemiBold">유통기한 </span>
                <span className="font-main-Regular text-gray3">
                  {currentPost.expiration_date}
                </span>
              </div>

              {/* 해시태그 배열 */}
              {currentPost.hashtags && currentPost.hashtags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-4">
                  <span className="font-main-SemiBold">카테고리 </span>
                  {currentPost.hashtags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-primary40 font-main-Regular rounded-[100px] px-2 py-0.5"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center text-sm text-gray-400">
            상세 정보를 불러오는 중입니다...
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductPage;
