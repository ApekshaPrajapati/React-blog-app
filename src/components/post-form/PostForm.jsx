import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from '../index'
import appwriteService from "../../appwrite/configapp"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    })


    const navigate = useNavigate()
    const userData = useSelector(state => state.auth?.userData)
    const submit = async (data) => {
        console.log("RAW TITLE VALUE:", data.title);
        if (userData === undefined) {
            return;
        }

        if (!userData) {
            navigate("/login");
            return;
        }

        let file = null;

        if (post) {
            if (data.image && data.image[0]) {
                file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    if (post?.image) {
                        await appwriteService.deleteFile(post.image);
                    }
                }
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status,
                image: file ? file.$id : post.image
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }

        else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (!file) return;

            const slug = slugTransform(data.title);
            if (!slug) {
                return;
            }

            const payload = {
                slug,
                title: data.title,
                content: data.content,
                image: file.$id,
                status: data.status,
                userid: userData.$id
            };

            const dbPost = await appwriteService.createPost(payload);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }

    }

    useEffect(() => {
        console.log("Redux userData:", userData);
    }, [userData]);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .trim()
                .split(" ")
                .filter(Boolean)
                .join("-");
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title,
                    { shouldValidate: true }))
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    useEffect(() => {
        return () => console.log("PostForm UNMOUNTED");
    }, []);
    if (userData === undefined) {
        return <p>Checking login...</p>;
    }
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(submit)(e) }} className="flex flex-wrap">

            <div className="w-2/3 px-2 ">
                <Input label="Title:  "
                    placeholder="Title"
                    className="mb-6 text-lg py-1.5 rounded-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                    {...register("title", {
                        required: true
                    })}>
                </Input>
                <Input label="Slug: "
                    placeholder="Slug"
                    className="mb-6 text-lg py-1.5 rounded-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                    {...register("slug", {
                        required: true
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true
                        })
                    }}>
                </Input>
                <RTE label="Content: " name="content"
                    control={control} defaultValue={getValues("content")}></RTE>
            </div>


            <div className="w-1/3 px-2 ">
                <input label="Featured Image: "
                    type="file"
                    placeholder="file"
                    className="mb-6 block w-full text-lg text-gray-700
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-lg file:border-0
                               file:text-lg file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               hover:file:bg-blue-100"
                    accept="image/png, image/jpg,image/jpeg,image/gif"
                    {...register("image", {
                        required: !post
                    })}>
                </input>

                {post?.image && (
                    <div className="w-full mb-4">
                        <img src={appwriteService.getFilePreview(post.image)} alt={post.title} />
                    </div>
                )}

                <Select options={["active", "inactive"]}
                    label="Status"
                    className="mb-6 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    {...register("status", { required: true })} >
                </Select>
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined}
                    className="w-52 py-3 text-lg font-semibold rounded-xl 
                             bg-blue-600 text-white 
                             hover:bg-blue-700 
                               transition duration-300 
                               hover:scale-105">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>

    )
}

export default PostForm