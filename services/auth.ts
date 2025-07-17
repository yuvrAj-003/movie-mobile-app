// google auth 

import { Account, Client } from "react-native-appwrite";


const client = new Client();


client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)


export const account = new Account(client);