import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>DivWork</h1>
      <div>
        <Link to="/teams/select">新規ユーザー登録</Link>
      </div>
      <div>
        <Link to="/">ゲストログイン</Link>
      </div>
    </div>
  );
}

export default App;
