import ChatBox from "../pages/ChatBox";
import Connections from "../pages/Connections";
import CreatePost from "../pages/CreatePost";
import Discover from "../pages/Discover";
import Feed from "../pages/Feed";
import Login from "../pages/login";
import MainLayout from "../pages/MainLayout";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import Loading from "../components/Loading";
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Toaster } from "react-hot-toast";
import {createBrowserRouter,RouterProvider} from "react-router-dom";

// Protected Route wrapper component
function ProtectedRoute() {
  const { user, isLoaded } = useUser();
  
  // Wait for Clerk to finish loading
  if (!isLoaded) {
    return <div>
      <Loading />
      </div>; // Or a proper loading spinner
  }
  
  // If no user after loading, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <MainLayout />;
}

const router = createBrowserRouter([
  {
    path: "/login",
  Component: Login ,
  },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "messages",
        Component: Messages ,
      },
      {
        path: "messages/:userId",
        Component: ChatBox ,
      },
      {
        path: "connections",
        Component: Connections,
      },
      {
        path: "discover",
        element: <Discover />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/:profileId",
        element: <Profile />,
      },
      {
        path: "create-post",
        Component: CreatePost ,
      },
    ],
  },
]);

export default function RoutesPages() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

// // import { createBrowserRouter, RouterProvider } from "react-router";
// // import MainLayout from "../pages/MainLayout";
// // import Login from '../pages/login'
// // import Feed from '../pages/Feed'
// // import Messages from '../pages/Messages'
// // import ChatBox from '../pages/ChatBox'
// // import Connections from '../pages/Connections'
// // import Discover from '../pages/Discover'
// // import Profile from '../pages/Profile'
// // import CreatePost from '../pages/CreatePost'

// // const router = createBrowserRouter([
// // {
// //     path: "/",
// //     Component: MainLayout,

// //     children:[
// //         {
        
// //     }]
// // }

// // ])


// import ChatBox from "../pages/ChatBox";
// import Connections from "../pages/Connections";
// import CreatePost from "../pages/CreatePost";
// import Discover from "../pages/Discover";
// import Feed from "../pages/Feed";
// import Login from "../pages/login";
// import MainLayout from "../pages/MainLayout";
// import Messages from "../pages/Messages";
// import Profile from "../pages/Profile";
// import { Route, Routes } from 'react-router-dom'
// import {useUser} from '@clerk/clerk-react'
// import {Toaster} from "react-hot-toast";

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router";

// const  router = createBrowserRouter([
//   {
//     path: "/",
//     Component: ,
//     loader: ,
//   },
// ]);
// export default function RoutesPages(){
//     return <RouterProvider router ={router}/>}










// // const RoutesPages = () => {

// //    const {user} = useUser()

// //   return (
// //     <div>
// //       <Toaster/>
// //       <Routes>
// //         <Route path='/' element={ !user ? <Login /> : <MainLayout/>}>
// //           <Route index element={<Feed/>}/>
// //           <Route path="messages" element={<Messages/>}/>
// //           <Route path="messages/:userId" element={<ChatBox/>}/>
// //           <Route path="connections" element={<Connections/>}/>
// //           <Route path="discover" element={<Discover/>}/>
// //           <Route path="profile" element={<Profile/>}/>
// //           <Route path="profile/:profileId" element={<Profile/>}/>
// //           <Route path="create-post" element={<CreatePost/>}/>
// //         </Route>
// //       </Routes>
// //     </div>
// //   )
// // }

// // export default RoutesPages



 