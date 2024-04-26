import AllPosts from "./components/posts/AllPosts";
import CreatePost from "./components/posts/CreatePost";
import UpdatePost from "./components/posts/UpdatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicNavbar from "./components/Navbar/PublicNavbar";

const App = () => {
  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/update/:postId" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
