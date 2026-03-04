import conf from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            .setSession('current')//add

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, image, status, userid }) {//featueredImage to image and userId to userid

        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId, ID.unique(), {
                title, slug, content, image, status, userid
            }
            )//remove slug

        } catch (error) {
            console.log("Appwrite service :: createPost ::error", error);
        }

    }

    async updatePost(documentId, {
        title, content, image, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,//slug
                documentId, {
                title, content, image, status
            }
            )

        } catch (error) {
            console.log("Appwrite service :: updatePost ::error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost ::error", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost ::error", error)
            return false
        }
    }

    async getUserPosts(userid) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userid", userid)
                ]
            );
        }
        catch (error) {
            console.log("Appwrite service :: getuserPosts ::error", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts ::error", error)
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile ::error", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile ::error", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFileView(
            conf.appwriteBucketId,
            fileId
        );
    }


}


const appwriteService = new Service()

export default appwriteService