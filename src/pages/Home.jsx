import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from '../appwrite/configapp'
import { Link } from "react-router-dom";


function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    const Section = () => (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 border rounded-lg">
            <Container>
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Welcome to BlogSpace 🚀
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Discover ideas, write blogs, and share your knowledge with the world.
                    </p>
                </div>
            </Container>
        </div>
    )
    return (
        <div className="w-full mt-5">
            <Section />

            <div className="py-16">
                <Container>

                    <h2 className="text-3xl font-bold text-center mb-12">
                        Latest <span className="text-blue-600">Blogs</span>
                    </h2>

                    {posts.length === 0 ? (
                        <div className="text-center">
                            <h1 className="text-xl font-semibold">
                                Login to read posts
                            </h1>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts && posts.length > 0 && posts.slice(0, 3).map((post) => (
                                <PostCard key={post.$id} post={post} />
                            ))}
                        </div>
                    )}
                    
                    <div className="text-center mt-6">
                        <Link to="/all-posts" className="text-blue-600 font-semibold hover:underline">
                            View All Posts →
                        </Link>
                    </div>
                </Container>
            </div>

            <div className="bg-white py-20 border rounded-lg">
                <Container>
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Why BlogSpace?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">✍ Easy Writing</h3>
                            <p>Create beautiful blogs using our rich editor.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">⚡ Fast & Secure</h3>
                            <p>Powered by Appwrite backend.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">🌍 Share Ideas</h3>
                            <p>Connect with readers worldwide.</p>
                        </div>
                    </div>
                </Container>
            </div>

        </div>


    )



}

export default Home

