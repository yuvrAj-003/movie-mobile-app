
import CustomDialogBox from '@/components/CustomDialogBox'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { account } from '@/services/auth'
import useAuth from '@/services/useAuth'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View, } from 'react-native'
import { Models } from 'react-native-appwrite'


const Profile = () => {

    const { loading, user } = useAuth(account);
    const usr = user as Models.Preferences

    const { SignOut } = useAuth(account);

    const [confirmSignOut, setConfirmSignOut] = useState(false)



    return (
        <View className="flex-1 bg-primary h-full w-full justify-center items-center">
            <Image source={images.bg} className="absolute w-full z-0 top-0" />


            {/* loading  */}

            {loading && <ActivityIndicator size="large" color="white" className='mt-20'
            />}

            {/* error message  */}
            {
                (!user && !loading) &&
                <View className='h-full w-full flex-1 flex-col items-center justify-center'>

                    <Text className='text-white text-3xl font-bold'>
                        You are not authenticated
                    </Text>
                    <TouchableOpacity
                        className='mt-10 ml-3 w-3/6 bg-accent rounded-full px-4 py-4'
                        onPress={() => router.push("/Auth/Login")}

                    >
                        <Text className='text-xl font-bold text-center'>Login Or Register</Text>
                    </TouchableOpacity>
                </View>
            }

            {/* user info  */}
            {user &&
                <View className=' bg-dark-200 w-5/6 rounded-xl p-3 relative flex-col justify-center items-center'>
                    {/* profile image  */}
                    <View className='w-full absolute -top-12'>
                        <View className=' bg-white w-[100px] h-[100px] mx-auto rounded-full flex justify-center items-center'>
                            <Image
                                source={icons.profile}
                                resizeMode='cover'
                                className='size-10'
                            />
                        </View>
                    </View>

                    <View className='mt-20 mx-4 bg-dark-100 p-3 rounded-xl w-full'>
                        <Text className='text-white text-xl font-bold'>UserId</Text>
                        <Text className='text-white'>{usr?.$id}</Text>
                    </View>

                    <View className='mt-5 mx-4 bg-dark-100 p-3 rounded-xl w-full'>
                        <Text className='text-white text-xl font-bold'>Username</Text>
                        <Text className='text-white'>{usr?.name}</Text>
                    </View>

                    <View className='mt-5 mx-4 bg-dark-100 p-3 rounded-xl w-full'>
                        <Text className='text-white text-xl font-bold'>Email</Text>
                        <Text className='text-white'>{usr?.email}</Text>
                    </View>

                    {/* sign out  */}
                    <TouchableOpacity
                        className='bg-accent rounded-full px-3 py-4 w-3/6 mt-5 mb-4 flex justify-center items-center'
                        onPress={() => setConfirmSignOut(true)}
                    >
                        <Text className='text-primary font-bold'>Sign Out</Text>
                    </TouchableOpacity>

                    {/* sign out dialog box  */}
                    <CustomDialogBox
                        title="Sign Out"
                        ConfirmColor="bg-accent"
                        message="Do You want to Sign Out ?"
                        visible={confirmSignOut}
                        onClose={() => setConfirmSignOut(false)}
                        onConfirm={async () => {
                            await SignOut('current')
                            router.push('/Auth/Register')
                            setTimeout(() => {
                                router.push('/')
                            }, 100);
                            setConfirmSignOut(false)
                        }}
                    />

                </View>
            }
        </View>
    )
}

export default Profile
