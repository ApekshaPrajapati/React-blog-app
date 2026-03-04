import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from '../appwrite/configapp'
import { useSelector,} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function AllPosts() {
  const [posts, setPosts] = useState([])
  const userData = useSelector(state => state.auth?.userData);
  
  useEffect(() => {
    
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (<div className=" w-full py-8 ">
   {userData ===null ?(
    <div className="">
    <h1 className="mt-4 font-semibold text-xl">Please login to read all posts</h1>
   <div className="text-center mt-6">
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline text-lg">
                            login →
                        </Link>
                    </div>
                    </div>
                    ):(
    <Container>

      <h1 className="mt-4 font-semibold text-xl">Explore all blog posts created by users. </h1>
      <h1 className="text-lg mb-4">Click on any post to read the full content and learn more about modern web development.</h1>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">

        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard key={post.$id} post={post} />

          </div>

        ))}

      </div>

    </Container>
    )}
  </div>)
}

export default AllPosts