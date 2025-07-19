/* eslint-disable react-hooks/exhaustive-deps */

import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Account, ID, Models, OAuthProvider } from "react-native-appwrite";


// console.log login with google
const useAuth = (account: Account) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [user, setUser] = useState<Models.Session | Models.Preferences | undefined>();



    const SignWithGoogle = async () => {

        try {
            setLoading(true);
            const deepLink = new URL(makeRedirectUri());
            const scheme = `${deepLink.protocol}// console.log`;

            // Start OAuth flow
            const loginUrl = await account.createOAuth2Token(
                OAuthProvider.Google,
                `${deepLink}`,
                `${deepLink}`,
            );

            // Open loginUrl and listen for the scheme redirect
            const result: any = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);

            // Extract credentials from OAuth redirect URL
            const url = new URL(result.url);
            const secret: any = url.searchParams.get('secret');
            const userId: any = url.searchParams.get('userId');

            // Create session with OAuth credentials
            await account.createSession(userId, secret);
            // console.log("google account logged in")
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occured'))
            const e = String(err).replace(":", ".")
            // console.log(e.split(".")[1])
            throw new Error(e.split(".")[1])
        }
        finally {
            setLoading(false);
        }
    };


    const SignUpWithEmailAndPassword = async (email: string, password: string) => {
        try {
            setLoading(true);
            await account.create(
                ID.unique(),
                email,
                password
            )


            await account.createEmailPasswordSession(
                email,
                password
            )

            fetchInfo();
            // console.log('account created successfully');

        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occured'))
            const e = String(err).replace(":", ".")
            // console.log(e.split(".")[1])
            throw new Error(e.split(".")[1])


        }
        finally {
            setLoading(false);
        }
    }

    const SignInWithEmailAndPassword = async (email: string, password: string) => {
        try {
            setLoading(true);
            await account.createEmailPasswordSession(
                email,
                password
            )

            fetchInfo()
            // console.log("logged in successfully");


        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occured'))
            const e = String(err).replace(":", ".")
            // console.log(e.split(".")[1])
            throw new Error(e.split(".")[1])

        }
        finally {
            setLoading(false);
        }
    }

    const fetchInfo = async () => {
        const user = await account.get();
        setUser(user);
        // console.log("user authenticated")

    }



    useEffect(() => {
        fetchInfo();
    }, [])
    return {
        user,
        loading,
        error,
        SignWithGoogle,
        SignUpWithEmailAndPassword,
        SignInWithEmailAndPassword
    };
};

export default useAuth;