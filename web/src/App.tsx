import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import RoundList from "./pages/RoundList";
import RoundPage from "./pages/RoundPage";
import { Header } from "./widgets/header/ui/Header";

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* логин без хедера */}
          <Route path="/" element={<Login />} />

          {/* все остальные страницы с хедером */}
          <Route element={<Layout />}>
            <Route path="/rounds" element={<RoundList />} />
            <Route path="/rounds/:id" element={<RoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
