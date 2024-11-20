import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/connections" element={<div>Connections</div>} />
            <Route path="/profile" element={<div>Profile</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
