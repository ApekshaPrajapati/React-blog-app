import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home.jsx'
import { AuthLayout,Login } from './components/index.js'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Signup from './pages/Signup.jsx'
import Post from './pages/Post.jsx'
import MyPosts from './pages/MyPosts.jsx'
 const router=createBrowserRouter([{
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
             {
                path:'/login',
                element:(<AuthLayout authentication={false}>
                    <Login/>
                </AuthLayout>)
            },
             {
                path:'/signup',
                element:(<AuthLayout authentication={false}>
                    <Signup/>
                </AuthLayout>)
            },
             {
                path:'all-posts',
                element:(<AuthLayout authentication={false}>
                    <AllPosts/>
                </AuthLayout>)
            },
           
             {
                path:'/add-post',
                element:(<AuthLayout authentication={true}>
                   <AddPost/>
                </AuthLayout>)
            },
            {
                path:'/my-post',
                element:(<AuthLayout authentication={true}>
                   <MyPosts/>
                </AuthLayout>)
            },
             {
                path:'/edit-post/:id',
                element:(<AuthLayout authentication={true}>
                    <EditPost/>
                </AuthLayout>)
            },
             {
                path:'/post/:id',
                element:<Post/>
            },
        ]
    }])


createRoot(document.getElementById('root')).render(
 

<React.StrictMode>
<Provider store={store}>
 <RouterProvider router={router}>

 </RouterProvider>
    </Provider>
    </React.StrictMode>
)
