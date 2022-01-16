import "./App.css";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
  return <div className="App"></div>;
}

export default App;
