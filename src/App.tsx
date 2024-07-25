import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./routes/landing";
import DrawingPage from "./routes/drawing";
import SideMenu from "./components/sideMenu";
import NotebookIndexPage from "./routes/notebook";
import DiaryIndexPage from "./routes/diary";
import DiaryEditPage from "./routes/diary/edit";
import NotebookCreatePage from "./routes/notebook/create";
import NotebookOverviewPage from "./routes/notebook/[id]/overview";
import NotebookEditTextPage from "./routes/notebook/[id]/edit/text";
import DiaryViewPage from "./routes/diary/view";
import AccountingOverviewPage from "./routes/accounting/overview";

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
    path: "/notebook/create",
    element: <NotebookCreatePage />,
  },
  {
    path: "/notebook/:notebookId",
    element: <NotebookOverviewPage />,
  },
  {
    path: "/notebook/:notebookId/edit/:textId",
    element: <NotebookEditTextPage />,
  },
  {
    path: "/diary",
    element: <DiaryIndexPage />,
  },
  {
    path: "/diary/:year/:month/:day/:index/edit",
    element: <DiaryEditPage />,
  },
  {
    path: "/diary/:diaryDate",
    element: <DiaryViewPage />,
  },
  {
    path: "/accounting",
    element: <AccountingOverviewPage />,
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
