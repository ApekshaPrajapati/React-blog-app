import React from "react";
import { Link } from "react-router-dom";
import { Container, Logo, Logout } from '../index'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {

    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()

    const navItems = [{
        name: 'Home',
        slug: "/",
        active: true
    },
    {
        name: 'Login',
        slug: "/login",
        active: !authStatus
    },
    {
        name: 'Signup',
        slug: "/signup",
        active: !authStatus
    },
    {
        name: 'All Posts',
        slug: "/all-posts",
        active: authStatus
    },
    {
        name: 'Add Post',
        slug: "/add-post",
        active: authStatus
    },
    {
        name: 'My Posts',
        slug: "/my-post",
        active: authStatus
    },
    ]
    return (<>
        <header className="py-3  text-blue-700 font-semibold bg-gradient-to-r from-purple-300 to-blue-300 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <Container>
                <nav className="flex items-center justify-between flex-wrap">
                    <div className=" mr-2 md:mr-4 flex-shrink-0">
                        <Link to='/'>
                            <Logo width="70px">

                            </Logo>
                        </Link>
                    </div>
                    <ul className="flex items-center  ml-3  text-xs md:text-base sm:space-x-3  whitespace-nowrap justify-evenly">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button className="inline-block px-2 md:px-6 py-1.5 md:py-2  duration-200 hover:bg-white rounded-full"
                                        onClick={() => navigate(item.slug)}>
                                        {item.name}</button>
                                </li>) : null
                        )}
                        {authStatus && (
                            <li>
                                <Logout></Logout>
                            </li>
                        )}

                    </ul>

                </nav>
            </Container>
        </header>
    </>)
}

export default Header