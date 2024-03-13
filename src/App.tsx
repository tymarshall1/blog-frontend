import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/ui/layout";

function App() {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
