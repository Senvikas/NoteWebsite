import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Pastes from './components/Pastes';
import ViewPaste from './components/ViewPaste';

// Create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        {/* <DarkModeToggle /> Add DarkModeToggle */}
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        {/* <DarkModeToggle /> Add DarkModeToggle */}
        <Pastes />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        {/* <DarkModeToggle /> Add DarkModeToggle */}
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
