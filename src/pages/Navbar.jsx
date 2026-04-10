import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyIcon from "../components/icons/MyIcon";
import HomeIcon from "../components/icons/HomeIcon";
import NewIcon from "../components/icons/NewIcon";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Outlet /> {/*이 위치에 자식 컴포넌트 렌더링 */}
      <footer style={{ display: "flex", flexDirection: "row" }}>
        <div onClick={() => navigate("/productpage")}>
          <NavLink to="/productpage">
            {({ isActive }) => (
              <HomeIcon
                className={isActive ? "text-blue-500" : "text-gray-400"}
              />
            )}
          </NavLink>
          <span>홈</span>
        </div>
        <div onClick={() => navigate("/mypage")}>
          <NavLink to="/mypage">
            {({ isActive }) => (
              <MyIcon
                className={isActive ? "text-blue-500" : "text-gray-400"}
              />
            )}
          </NavLink>
          <span>마이</span>
        </div>
        <div onClick={() => navigate("/register")}>
          <NavLink to="/register">
            {({ isActive }) => (
              <NewIcon
                className={isActive ? "text-blue-500" : "text-gray-400"}
              />
            )}
          </NavLink>
          <span>등록</span>
        </div>
      </footer>
    </>
  );
};

export default Navbar;
