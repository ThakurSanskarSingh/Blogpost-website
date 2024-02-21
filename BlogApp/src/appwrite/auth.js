//  how to use authentication service databse service storage services 
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// create a class for client and account services so that we can use it again and again 

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client.
        setEndpoint(conf.appwiteUrl)
        .setProject(conf.appwiteProjectId)
        this.account = new Account(this.client)
    } 
    async createAccount ({email,password,name}){
        try {
           const userAccount =  await this.account.create(ID.unique(),email,password,name)
           if(userAccount) {
            return this.login({email,password})

           } else {
            return userAccount
           }
           
        } catch (error) {
            throw error
            
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailSession
            (email,password)
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUSer() :: ",error)
        }
        return  null

    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUSer() :: ",error);
        }
    }
}

const authService = new AuthService()
export default authService









// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') 
//     .setProject('<PROJECT_ID>');              
// const account = new Account(client);
