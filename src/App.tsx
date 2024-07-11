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
import Explore from "./pages/explore";
import About from "./pages/about";
import Help from "./pages/help";
import Careers from "./pages/careers";
import ContentPolicy from "./pages/contentPolicy";
import PrivacyPolicy from "./pages/privacyPolicy";
import UserAgreement from "./pages/userAgreement";
import FindCommunities from "./pages/communities";
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
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />

          <Route path="/help" element={<Help />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/content-policy" element={<ContentPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/user-agreement" element={<UserAgreement />} />
          <Route path="/communities" element={<FindCommunities />} />

          <Route
            path="/community/:communityName/:post/:id"
            element={<SinglePost />}
          />
          <Route
            path="/community/create"
            element={user ? <CreateCommunity /> : <Unauthorized />}
          />
          <Route
            path="/community/:communityName/create-post"
            element={user ? <PostCreation /> : <Unauthorized />}
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
