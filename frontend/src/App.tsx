import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>DivWork</h1>
      <div>
        <Link to="/teams/select">新規ユーザー登録</Link>
      </div>
      <div>
        <Link to="/auth/sign_in">ログイン</Link>
      </div>
      <div>
        <Link to="/">ゲストログイン</Link>
      </div>
    </div>
  );
};

export default App;
