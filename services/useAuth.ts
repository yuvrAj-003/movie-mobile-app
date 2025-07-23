/* eslint-disable react-hooks/exhaustive-deps */

import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Account, ID, Models, OAuthProvider } from "react-native-appwrite";


const useAuth = (account: Account) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [user, setUser] = useState<Models.Session | Models.Preferences | undefined>();


    // oauth google 
    const SignWithGoogle = async () => {

        try {
            setLoading(true);
            const deepLink = new URL(makeRedirectUri());
            const scheme = `${deepLink.protocol}`;

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

        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occured'))
            const e = String(err).replace(":", ".")
            throw new Error(e.split(".")[1])
        }
        finally {
            setLoading(false);
        }
    };

    // sign up with email and password 
    const SignUpWithEmailAndPassword = async (username: string, email: string, password: string) => {
        try {
            setLoading(true);
            await account.create(
                ID.unique(),
                email,
                password,
                username
            )


            await account.createEmailPasswordSession(
                email,
                password
            )

            fetchInfo();

        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occured'))
            const e = String(err).replace(":", ".")
            throw new Error(e.split(".")[1])


        }
        finally {
            setLoading(false);
        }
    }

    // sign in with email password 
    const SignInWithEmailAndPassword = async (email: string, password: string) => {
        try {
            setLoading(true);
            await account.createEmailPasswordSession(
                email,
                password
            )

            fetchInfo()


        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occured'))
            const e = String(err).replace(":", ".")
            throw new Error(e.split(".")[1])

        }
        finally {
            setLoading(false);
        }
    }

    // sign out 
    const SignOut = async (sessionId: string) => {

        try {
            setLoading(true);
            await account.deleteSession(sessionId)
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error("An error occured"));

        }
        finally {
            setLoading(false);
        }


    }



    // get user info
    const fetchInfo = async () => {
        try {
            setLoading(true);
            const user = await account.get();

            setUser(user);

        }
        catch (err) {
            setError(err instanceof Error ? err : new Error("an error occured"))
        }
        finally {
            setLoading(false);
        }

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
        SignInWithEmailAndPassword,
        SignOut
    };
};

export default useAuth;