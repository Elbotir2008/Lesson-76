import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Edit from "./components/Edit";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/add/edit:code" element={<Edit />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
