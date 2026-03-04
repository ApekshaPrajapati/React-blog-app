import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/configapp";
import { Container } from "../components";
import { Link } from "react-router-dom";
function MyPosts() {

    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {

        if (!userData) {
            navigate("/login");
            return;
        }

        appwriteService
            .getUserPosts(userData.$id)
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });

    }, [userData, navigate]);

    return (

        <div className="w-full max-w-7xl mx-auto py-16">
            <Container>

                {posts.length === 0 && (
                    <p className="text-center text-gray-500">No posts found</p>
                )}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3  max-w-5xl mx-auto rounded-xl justify-items-center">
                    {posts.map((post) => (
                        <Link to={`/post/${post.$id}`}>
                            <div
                                key={post.$id}
                                className=" w-full  bg-white rounded-xl shadow-md overflow-hidden p-4
                                            hover:shadow-xl hover:-translate-y-1
                                            transition duration-300 "
                                >
                                <img
                                    src={appwriteService.getFilePreview(post.image)}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded-xl"
                                />

                                <div className="p-3">
                                    <h2 className="text-lg font-semibold mb-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {post.content.replace(/<[^>]+>/g, "")}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>

            </Container>
        </div>

    );
}

export default MyPosts;