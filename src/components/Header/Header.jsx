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
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width="70px">

                            </Logo>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button className="inline-block px-6 py-2 duration-200 hover:bg-white rounded-full"
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