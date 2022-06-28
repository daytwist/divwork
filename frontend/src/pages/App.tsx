import React from "react";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>DivWork</h1>
      <div>
        <Link to="/sign_up/teams/select">サインアップ</Link>
      </div>
      <div>
        <Link to="/sign_in">サインイン</Link>
      </div>
    </div>
  );
};

export default App;
