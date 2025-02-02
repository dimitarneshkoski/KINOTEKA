import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/Root";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import MoviesRootLayout from "./pages/MoviesRoot";
import MoviesPage from "./pages/Movies";
import { loader as moviesLoader } from "./pages/Movies";
import HallPage, { loader as hallInfoLoader } from "./pages/HallPage.js";
import HallsPage, { loader as hallsInfoLoader } from "./pages/HallsPage.js";
import MovieDetailPage, {
  loader as movieDetailLoader,
} from "./pages/MovieDetail";
import AdminPage from "./pages/AdminPage.js";
import AddNewMovie from "./components/AddNewMovie.js";
import MovieEditPage from "./pages/MovieEdit.js";
import MovieProjectionPage, {
  loader as movieProjectionLoader,
} from "./pages/MovieProjectionPage.js";
import AddMovieProjection, {
  loader as movieProjectionsLoader,
} from "./pages/AddMovieProjections.js";
import MovieSearchPage, {
  loader as moviesSearchLoader,
} from "./pages/MovieSearchPage.js";
import { action as logoutAction } from "./pages/Logout.js";
import {
  tokenLoader,
  checkAuthLoader,
  checkIsAdmin,
  checkLoginLoader,
} from "./util/auth.js";
import ProfileFavoriteMoviesPage, {
  loader as loadMoviesAndUserFirebase,
} from "./pages/ProfileFavoriteMoviesPage.js";
import ReservationsPage, {
  loader as loadMoviesAndUsersFirebase,
} from "./pages/ReservationsPage.js";
import ReservationDetailPage, {
  loader as loadReservationFirebase,
} from "./pages/ReservationDetailPage.js";
import AccessDeniedPage from "./pages/AccessDeniedPage.js";
import ComingSoonPage from "./pages/ComingSoonPage.js";
import CinemaDetailsPage from "./pages/CinemaDetailsPage.js";
import MyProfilePage from "./pages/MyProfilePage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: tokenLoader,
    id: "root",
    children: [
      { index: true, element: <HomePage />, loader: moviesLoader },
      {
        path: "auth",
        element: <AuthenticationPage />,
        loader: checkLoginLoader,
        action: authAction,
      },
      {
        path: "movies",
        element: <MoviesRootLayout />,
        id: "movies",
        children: [
          {
            index: true,
            element: <MoviesPage />,
            loader: moviesLoader,
          },
          {
            path: ":movieId",
            children: [
              {
                index: true,
                id: "movie-detail",
                loader: movieDetailLoader,
                element: <MovieDetailPage />,
              },
              {
                path: ":hallId/:projectionId",
                id: "movie-projection",
                element: <MovieProjectionPage />,
                loader: movieProjectionLoader,
              },
            ],
          },
        ],
      },
      {
        path: "admin",
        id: "admin",
        loader: checkIsAdmin,
        children: [
          {
            path: "movies",
            loader: checkAuthLoader,
            children: [
              { index: true, element: <AdminPage />, loader: moviesLoader },
              {
                path: "add-movie",
                element: <AddNewMovie />,
              },
              {
                path: "edit/:movieId",
                id: "edit-movie",
                loader: movieDetailLoader,
                children: [{ index: true, element: <MovieEditPage /> }],
              },
            ],
          },
          {
            path: "add-movie-projection",
            id: "add-movie-projection",
            element: <AddMovieProjection />,
            loader: movieProjectionsLoader,
          },
        ],
      },
      // {
      //   path: "halls",
      //   loader: checkIsAdmin,
      //   children: [
      //     {
      //       index: true,
      //       element: <HallsPage />,
      //       loader: hallsInfoLoader,
      //     },
      //     {
      //       path: ":hallId",
      //       id: "hall-info",
      //       loader: hallInfoLoader,
      //       children: [
      //         {
      //           index: true,
      //           element: <HallPage />,
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        path: "profile",
        id: "profile",
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <MyProfilePage />,
          },
          {
            path: "favorite-movies",
            id: "favorite-movies",
            loader: loadMoviesAndUserFirebase,
            element: <ProfileFavoriteMoviesPage />,
          },
          {
            path: "my-reservations",
            children: [
              {
                index: true,
                id: "my-reservations",
                loader: loadMoviesAndUsersFirebase,
                element: <ReservationsPage />,
              },
              {
                path: ":reservationId",
                element: <ReservationDetailPage />,
                loader: loadReservationFirebase,
              },
            ],
          },
        ],
      },
      {
        path: "coming-soon",
        element: <ComingSoonPage />,
        loader: moviesLoader,
      },
      // {
      //   path: "profile",
      //   // loader: moviesLoader,
      // },
      {
        path: "cinema-details",
        element: <CinemaDetailsPage />,
      },
      {
        path: "search",
        loader: moviesSearchLoader,
        element: <MovieSearchPage />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "access-denied",
        element: <AccessDeniedPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
