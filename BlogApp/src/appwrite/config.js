import { Client, Databases, Storage, Query , ID} from "appwrite";
import conf from "../conf/conf";
import authService from "./auth";


export class Service {
    client = new Client;
    databases;
    bucket;


    constructor() {
        this.client.setEndpoint(conf.appwiteUrl)
            .setProject(conf.appwiteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }
    //database services

    async getPost(slug){
        try {
          return await  this.databases.getDocument(conf.appwiteDataBaseId,conf.appwiteCollectionId,slug)
        } catch (error) {
            console.log("Appwrite Service :: getPost() ::", error);
            return false
        }
    }
    async getPosts (queries = [Query.equal("status","active")]){
        try {
          return await  this.databases.listDocuments(conf.appwiteDataBaseId,conf.appwiteCollectionId,queries)
        } catch (error) {
            console.log("Appwrite Service :: getPosts() ::", error);
            return false
        }
    }

    async createPost ({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwiteDataBaseId,conf.appwiteCollectionId,slug,{
                title,content,featuredImage,status
            })
        } catch (error) {
            console.log("Appwrite Service :: createPost() ::", error);
            return false
        }
    }

    async updatePost (slug,{title,featuredImage,content,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwiteDataBaseId,
                conf.appwiteCollectionId,
                slug,{
                    title,content,featuredImage,status
                }
                )
        } catch (error) {
            console.log("Appwrite Service :: updatePost() ::", error);
            return false
        }
    }
    async deletePost (slug){
        try {
             await this.databases.deleteDocument(
                conf.appwiteDataBaseId,
                conf.appwiteCollectionId,
                slug,
                )
                return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost() ::", error);
            return false
        }
    }

    //storage services
    async uploadFile (file){
        try {
           return  await this.bucket.createFile(
                conf.appwiteBucketId,
                ID.unique(),
                file
                  )
               
        } catch (error) {
            console.log("Appwrite Service :: uploadFile() ::", error);
            return false
        }
    }
    async deleteFile (fileId){
        try {
           return  await this.bucket.deleteFile(
                conf.appwiteBucketId,
                fileId
                  )
               
        } catch (error) {
            console.log("Appwrite Service :: deleteFile() ::", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwiteBucketId,
            fileId
        ).href
    }

}

const service = new Service()
export default  service;