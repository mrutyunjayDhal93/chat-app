import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Signin from "./Components/Auth/Signin";
import Chat from "./Components/Chat/Chat";
import { Routes, Route } from "react-router-dom";
import PrivateOutlet from "./Utility/ultRoute/PrivateRouter";

function App() {
  return (
    <div className="App">
      {/*--------------------SET ALL ROUTES-------------------*/}
      <Routes>
        {/*-------------ACT AS ENTRY POINT------------*/}
        <Route path="/" element={<Home />} />

        {/*-------------ROUTES FOR AUTH------------*/}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signin" element={<Signin />} />

        {/*-----IF USER LOGED-IN ,THEN ONLY GET ACCESS TO THESE ROUTES----*/}
        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
