import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Requests from "./components/Requests";
import Users from './components/Users'
import Create from './components/Create';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Users />} />
              <Route path="request" element={<Requests />} />
              <Route path="create" element={<Create />} />
              {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
