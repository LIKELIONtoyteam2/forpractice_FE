import Button from "./components/Button";
import Card from "./components/Card";
import NumberInput from "./components/NumberInput";
import TextArea from "./components/TextArea";
import TextInput from "./components/TextInput";

function App() {
  return (
    <>
      <p>공통 컴포넌트 테스트</p>
      <Button />
      <Card />
      <NumberInput />
      <br />
      <TextInput />
      <br />
      <TextArea />
    </>
  );
}

export default App;
