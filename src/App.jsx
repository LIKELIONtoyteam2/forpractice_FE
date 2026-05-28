import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignupNickname from "./pages/SignupPages/SignupNickname";
import SignupAccount from "./pages/SignupPages/SignupAccount";
import Navbar from "./pages/Navbar";
import ProductPage from "./pages/ProductPage";
import Mypage from "./pages/Mypage";
import MypageFix from "./pages/MypageFix";
import Register from "./pages/Register";
import SignupComplete from "./pages/SignupPages/SignupComplete";
import { ToastManager } from "./components/Toast";
import { useToastStore } from "./store/useToastStore";

function App() {
  const { type, text, isOpen, closeToast } = useToastStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup/nickname" element={<SignupNickname />} />
        <Route path="/signup/account" element={<SignupAccount />} />
        <Route path="/signup/complete" element={<SignupComplete />} />
        <Route element={<Navbar />}>
          <Route path="productpage" element={<ProductPage />} />
          <Route path="register" element={<Register />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="mypagefix" element={<MypageFix />} />
        </Route>
      </Routes>

      <ToastManager
        type={type}
        text={text}
        isOpen={isOpen}
        onClose={closeToast}
      />
    </>
  );
}

export default App;
