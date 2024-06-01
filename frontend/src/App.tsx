import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Index } from "./pages/Index";
import { CreatePost } from "./pages/CreatePost";
import { AccountPage } from "./pages/AccountPage";
import { PostPage } from "./pages/PostPage";

function App() {
  return (
    <>
      <Toaster toastOptions={{ duration: 5000 }} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </>
  );
}

export default App;
