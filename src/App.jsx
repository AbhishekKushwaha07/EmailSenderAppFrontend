import { useState } from "react";
import "./App.css";
import EmailSender from "./components/EmailSender";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <EmailSender></EmailSender>
    </>
  );
}

export default App;
