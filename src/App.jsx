import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignupNickname from "./pages/SignupPages/SignupNickname";
import SignupAccount from "./pages/SignupPages/SignupAccount";
import Navbar from "./pages/Navbar";
import ProductPage from "./pages/ProductPage";
import Mypage from "./pages/Mypage";
import MypageFix from "./pages/MypageFix";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup/nickname" element={<SignupNickname />} />
        <Route path="/signup/account" element={<SignupAccount />} />
        <Route element={<Navbar />}>
          <Route path="productpage" element={<ProductPage />} />
          <Route path="register" element={<Register />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="mypagefix" element={<MypageFix />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
