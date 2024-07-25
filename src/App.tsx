import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./routes/landing";
import DrawingPage from "./routes/drawing";
import SideMenu from "./components/sideMenu";
import NotebookIndexPage from "./routes/notebook";
import DiaryIndexPage from "./routes/diary";
import DiaryCreatePage from "./routes/diary/create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/drawing",
    element: <DrawingPage />,
  },
  {
    path: "/notebook",
    element: <NotebookIndexPage />,
  },
  {
    path: "/diary",
    element: <DiaryIndexPage />,
  },
  {
    path: "/diary/create",
    element: <DiaryCreatePage />,
  },
]);

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-row">
      <SideMenu />
      <div className="bg-gray-100 flex-grow w-full">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
