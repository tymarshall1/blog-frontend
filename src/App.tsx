import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/ui/layout";
import Articles from "./pages/articles";
import About from "./pages/about";
function App() {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
