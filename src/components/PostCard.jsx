
import React from "react";
import appwriteService from "../appwrite/configapp";
import { Link } from "react-router-dom";

function PostCard({ $id, title, post, image }) {

  if (!post) {
    return null;
  }

  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full rounded-xl p-4">
        <div className="bg-white rounded-xl shadow-md p-4 
             hover:shadow-xl hover:border-blue-500 border border-transparent
             transition duration-300">
          <div className="w-full justify-center mb-4 bg-white  rounded-2xl ">
            {post.image ? (
              <img
                src={appwriteService.getFilePreview(post.image)}
                alt={title}
                className="w-full h-48 object-cover rounded-lg"
              />

            )
              : (
                <p>No image</p>
              )}
          </div>
          <h2 className="text-xl font-bold p-1">{post.title}</h2>
        </div>

      </div>
    </Link>
  );
}

export default PostCard;