import React, { useState, useEffect } from "react";
import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHanlder = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };
  return (
    <React.Fragment>
      <div className="container">
        <Header />
        <Main />
      </div>
    </React.Fragment>
  );
}
export default App;
