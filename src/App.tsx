import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./routes/landing";
import DrawingPage from "./routes/drawing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/drawing",
    element: <DrawingPage />,
  }
]);

function App() {
  return (
    <div className="w-screen min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
