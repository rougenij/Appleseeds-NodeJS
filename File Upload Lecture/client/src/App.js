import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState("");
  const [multipleFiles, setmultipleFiles] = useState([]);

  const onClickHandler = () => {
    const data = new FormData();
    data.append("image", selectedFile);
    axios.post("http://localhost:5000/upload", data);
  };

  const fileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0]; // e.target.files -> returns Array of Objects.
    console.log(file);
    setSelectedFile(file);
  };

  const multiplefileUpload = (e) => {
    const allSelectedFiles = e.target.files;
    console.log(allSelectedFiles);
    setmultipleFiles(Object.values(allSelectedFiles));
  };
  const onClickMultipleHandler = () => {
    const data = new FormData();
    multipleFiles.forEach((file) => {
      console.log(file);
      data.append("uploadfiles", file);
    });
    axios.post("http://localhost:5000/uploadmultiple", data);
  };

  return (
    <div className="App">
      <div>
        <h2>Single File Upload</h2>
        <input type="file" onChange={(e) => fileUpload(e)} />
        <button onClick={onClickHandler}>Upload to Server</button>
      </div>
      <div>
        <h2> Multiple Files Upload</h2>
        <input type="file" multiple onChange={(e) => multiplefileUpload(e)} />
        <button onClick={onClickMultipleHandler}>Upload to Server</button>
      </div>

      <div>
        <h1>Picking Type of File Upload in Front-End</h1>
        <div>
          <label>Only Accepts PNG</label>
          <input type="file" accept=".png" />
        </div>
        <br />
        <div>
          <input type="file" accept="image/png, image/jpeg" />
        </div>
      </div>
      {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file */}
      {/* accept="image/png" or accept=".png" — Accepts PNG files. */}
      {/* accept="image/png, image/jpeg" or accept=".png, .jpg, .jpeg" — Accept PNG or JPEG files. */}
      {/* accept="image/*" — Accept any file with an image/* MIME type. (Many mobile devices also let the user take a picture with the camera when this is used.) */}
      {/* accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" — accept anything that smells like an MS Word document. */}
    </div>
  );
}

export default App;
