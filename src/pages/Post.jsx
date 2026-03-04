import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from '../appwrite/configapp'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser"
import { Button } from "../components";

export default function Post() {
    const [post, setPost] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    const { status, userData } = useSelector((state) => state.auth)
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (!id) return;

        appwriteService.getPost(id).then((post) => {
            if (post) setPost(post);
            else navigate("/");
        });


    }, [id, navigate])

    const deletePost = async () => {
        try {

            if (post.image) {
                await appwriteService.deleteFile(post.image);
            }

            await appwriteService.deletePost(post.$id);

            navigate("/");
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }
    return post ? (
        (<div className="py-10 ">
            <Container>
                <div className="  flex flex-col items-center">
                    <div className="w-full max-w-3xl h-auto bg-white shadow-lg rounded-2xl p-4 relative mb-6 overflow-hidden">

                        {post.image ? (
                          
                            <img
                                src={appwriteService.getFilePreview(post.image)}
                                alt={post.title}
                                className="w-full h-full object-cover rounded-xl "//change
                            />
                        ) : (
                            <p className="text-gray-500">No image</p>
                        )}
                        {isAuthor && (
                            <div className="absolute right-6 top-6 ">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="" className="mr-3 bg-green-600 hover:bg-green-700  text-white px-5 py-2 rounded-lg ">Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" classname=" hover:bg-red-700" onClick={deletePost}>Delete
                                </Button>

                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css">{parse(post.content)}</div>
                </div>
            </Container>

        </div>)
    ) : null
}

