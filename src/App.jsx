import Button from "./components/Button";
import Card from "./components/Card";
import NumberInput from "./components/NumberInput";
import TextArea from "./components/TextArea";
import TextInput from "./components/TextInput";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignupNickname from "./pages/SignupPages/SignupNickname";
import SignupAccount from "./pages/SignupPages/SignupAccount";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Mypage from "./pages/Mypage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup/nickname" element={<SignupNickname />} />
        <Route path="/signup/account" element={<SignupAccount />} />
        <Route element={<Navbar />}>
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="mypage" element={<Mypage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
