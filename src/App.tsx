import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Popular from "./pages/popular";
import Layout from "./components/ui/layout";
import Profile from "./pages/profile";
function App() {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/user/:username" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
