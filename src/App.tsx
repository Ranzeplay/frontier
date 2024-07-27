import { RouterProvider } from "react-router-dom";
import SideMenu from "./components/sideMenu";
import { createBrowserRouter } from "react-router-dom";
import AccountingOverviewPage from "./routes/accounting/overview";
import DiaryIndexPage from "./routes/diary";
import DiaryEditPage from "./routes/diary/edit";
import DiaryViewPage from "./routes/diary/view";
import DrawingPage from "./routes/drawing";
import LandingPage from "./routes/landing";
import NotebookIndexPage from "./routes/notebook";
import NotebookEditTextPage from "./routes/notebook/[id]/edit/text";
import NotebookOverviewPage from "./routes/notebook/[id]/overview";
import NotebookCreatePage from "./routes/notebook/create";

const appRoutes = createBrowserRouter([
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
    path: "/notebook/:notebookId/edit/text/:textId",
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
        <RouterProvider router={appRoutes} />
      </div>
    </div>
  );
}

export default App;
