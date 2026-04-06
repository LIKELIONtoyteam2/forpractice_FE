import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Product from "../components/Product";
import { useState } from "react";

// import { useState } from "react";

const ProductPage = () => {
  // const [SortType, setSortType] = useState("all");
  const [SelectedProduct, setSelectedProduct] = useState("all");

  const products = [
    {
      id: 1,
      name: "우유",
      openedDate: "2026-04-01",
      expiryDate: "2026-04-07",
      category: "유제품",
    },
    {
      id: 2,
      name: "닭가슴살",
      openedDate: "2026-04-03",
      expiryDate: "2026-04-06",
      category: "육류",
    },
    {
      id: 3,
      name: "샐러드",
      openedDate: "2026-04-05",
      expiryDate: "2026-04-21",
      category: "채소",
    },
  ];

  const getDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    const diff = expiry - today; // 밀리초 차이
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return daysLeft;
  };

  return (
    <>
      <img src="./icons/search.svg" />
      <TextInput type="text" placeholder="검색어를 입력하세요"></TextInput>
      <br />

      <Button type="button">전체</Button>
      <Button type="button">최신 등록순</Button>
      <Button type="button">유통기한 임박순</Button>
      <Button type="button">카테고리</Button>
      <br />

      {products.map((item) => (
        <Product
          key={item.id}
          name={item.name}
          daysLeft={getDaysLeft(item.expiryDate)}
          onClick={() => setSelectedProduct(item)}
        />
      ))}
      {/* 
      {SelectedProduct && (
        <Modal onClose={() => setSelectedProduct(null)}>
          <h2>{SelectedProduct.name}</h2>
          <p>유통기한: {SelectedProduct.expiryDate}</p>
          <p>카테고리: {SelectedProduct.category}</p>
        </Modal>
      )} */}
    </>
  );
};

export default ProductPage;
