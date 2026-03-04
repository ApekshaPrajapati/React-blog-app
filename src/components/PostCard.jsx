
import React from "react";
import appwriteService from "../appwrite/configapp";
import { Link } from "react-router-dom";
import parse from "html-react-parser"
function PostCard({ $id, title, post, image }) {

  if (!post) {
    return null;
  }

  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full rounded-xl p-4 ">
        <div className="bg-white rounded-xl shadow-md p-4 
             hover:shadow-xl hover:border-blue-500 border border-transparent
             transition duration-300 w-80 h-[28rem] flex flex-col overflow-hidden">
              <h2 className="text-xl font-bold p-1 text-left mb-2" >{post.title}</h2>
          <div className="w-72 h-48 justify-center mb-4 bg-white  rounded-2xl ">
            {post.image ? (
              <img
                src={appwriteService.getFilePreview(post.image)}
                alt={title}
                className="w-full h-full object-contain rounded-2xl"
              />

            )
              : (
                <p>No image</p>
              )}
          </div>
          <div className="browser-css p-2 flex flex-col flex-grow ">{parse(post.content)}</div>

        </div>

      </div>
    </Link>
  );
}

export default PostCard;