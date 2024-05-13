import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Popular from "./pages/popular";
import Layout from "./components/ui/layout";
import Profile from "./pages/profile";
import CreateCommunity from "./forms/createCommunity";
import { useAuthContext } from "@/hooks/useAuthContext";
import Unauthorized from "./components/ui/unauthorized";
import CommunityPage from "./pages/community";
import PostCreation from "./pages/postCreation";
import SinglePost from "./pages/singlePost";
function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/user/:username" element={<Profile />} />
          <Route path="/community/:communityName" element={<CommunityPage />} />
          <Route
            path="/community/:communityName/:post/:id"
            element={<SinglePost />}
          />
          <Route
            path="/community/create"
            element={user ? <CreateCommunity /> : <Unauthorized />}
          />
          <Route
            path="/create-post"
            element={user ? <PostCreation /> : <Unauthorized />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
