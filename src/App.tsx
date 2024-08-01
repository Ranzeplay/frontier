import { RouterProvider } from "react-router-dom";
import SideMenu from "./components/sideMenu";
import { createBrowserRouter } from "react-router-dom";
import AccountingOverviewPage from "./routes/accounting/overview";
import DiaryIndexPage from "./routes/diary";
import DiaryEditPage from "./routes/diary/edit";
import DiaryViewPage from "./routes/diary/view";
import LandingPage from "./routes/landing";
import NotebookIndexPage from "./routes/notebook";
import NotebookEditTextPage from "./routes/notebook/[id]/edit/text";
import NotebookOverviewPage from "./routes/notebook/[id]/overview";
import NotebookCreatePage from "./routes/notebook/create";
import AccountingEditPage from "./routes/accounting/edit";
import NotebookEditDrawingPage from "./routes/notebook/[id]/edit/draw";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
    path: "/notebook/:notebookId/edit/drawing/:drawingId",
    element: <NotebookEditDrawingPage />,
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
  {
    path: "/accounting/edit/:id",
    element: <AccountingEditPage />,
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
