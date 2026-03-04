import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from '../appwrite/configapp'
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (!id) return;

    appwriteService.getPost(id)
      .then((postData) => {
        console.log("POST DATA:", postData);
        setPost(postData);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });

  }, [id]);
  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}
export default EditPost