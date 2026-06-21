import { Outlet, NavLink } from "react-router-dom";
import MyIcon from "../components/icons/MyIcon";
import HomeIcon from "../components/icons/HomeIcon";
import NewIcon from "../components/icons/NewIcon";

const Navbar = () => {
  return (
    <div className="relative min-h-screen pb-20">
      {" "}
      {/* 푸터 높이만큼 바닥 여백 확보 */}
      {/* 실제 페이지 내용이 렌더링되는 곳 */}
      <div className="mx-auto w-100.5 bg-white">
        <Outlet />
      </div>
      {/* 하단 고정 네비게이션 바 */}
      <footer className="fixed bottom-0 left-1/2 w-100.5 -translate-x-1/2 bg-white px-6 py-3">
        <div className="flex items-center justify-around">
          {/* 홈 버튼 */}
          <NavLink
            to="/productpage"
            className="flex flex-col items-center gap-1"
          >
            {({ isActive }) => (
              <>
                <HomeIcon
                  className={isActive ? "color-gray2" : "text-gray-400"}
                />
                <span
                  className={`font-main text-[11px] ${isActive ? "font-main-Bold text-black " : "text-gray-400"}`}
                >
                  홈
                </span>
              </>
            )}
          </NavLink>

          {/* 등록 버튼 (중앙) */}
          <NavLink to="/register" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <NewIcon
                  className={isActive ? "color-gray2" : "text-gray-400"}
                />
                <span
                  className={`font-main text-[11px] ${isActive ? "font-main-Bold text-black" : "text-gray-400"}`}
                >
                  등록
                </span>
              </>
            )}
          </NavLink>

          {/* 마이페이지 버튼 */}
          <NavLink to="/mypage" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <MyIcon
                  className={isActive ? "color-gray2" : "text-gray-400"}
                />
                <span
                  className={`font-main text-[11px] ${isActive ? "font-main-Bold text-black" : "text-gray-400"}`}
                >
                  마이
                </span>
              </>
            )}
          </NavLink>
        </div>
      </footer>
    </div>
  );
};

export default Navbar;
