import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Lessons from "./pages/lessons.jsx";
import Home from "./pages/home.jsx";
import ErrorPage from "./error-page.jsx";
import DefaultLayout from "./layouts/default.jsx";
import DashboardLayout from "./layouts/dashboard.jsx";
import AddLesson from "./pages/add-lesson.jsx";
import AddVocabulary from "./pages/add-vocabulary.jsx";
import ManageUsers from "./pages/manage-users.jsx";
import LessonManagement from "./pages/lesson-management.jsx";
import VocabularyManagement from "./pages/vocabulary-management.jsx";

axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.baseURL = "https://japanese-vocabulay-learning-server.onrender.com/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        ),
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "lessons",
            element: <Lessons />,
          },
          {
            path: "add-lesson",
            element: <AddLesson />,
          },
          {
            path: "add-vocabulary",
            element: <AddVocabulary />,
          },
          {
            path: "manage-users",
            element: <ManageUsers />,
          },
          {
            path: "lesson-management",
            element: <LessonManagement />,
          },
          {
            path: "vocabulary-management",
            element: <VocabularyManagement />,
          },
        ],
      },
      {
        path: "/lessons",
        element: <Lessons />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: (
          <DefaultLayout>
            <Login />
          </DefaultLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
