import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Outlet /> {/*이 위치에 자식 컴포넌트 렌더링 */}
      <footer style={{ display: "flex", flexDirection: "row" }}>
        <div onClick={() => navigate("/productpage")}>
          <img src="./icons/home.svg" />
          <span>홈</span>
        </div>
        <div onClick={() => navigate("/mypage")}>
          <img src="./icons/mypage.svg" />
          <span>마이</span>
        </div>
        <div onClick={() => navigate("/register")}>
          <img src="./icons/register_png.png" />
          <span>등록</span>
        </div>
      </footer>
    </>
  );
};

export default Navbar;
