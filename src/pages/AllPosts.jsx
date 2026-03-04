import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from '../appwrite/configapp'

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {

    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (<div className=" w-full py-16 ">
    <Container>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 ">

        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard key={post.$id} post={post} />

          </div>

        ))}

      </div>

    </Container>
  </div>)
}

export default AllPosts