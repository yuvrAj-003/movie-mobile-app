// import { images } from "@/constan"
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'


const TabIcon = ({ text, icon, focused }: any) => {
    return focused ? (
        <ImageBackground
            source={images.highlight}
            className='flex flex-row w-[200px] min-h-[53px] justify-center items-center overflow-hidden rounded-full gap-1 mt-4'
        >
            <Image source={icon} tintColor="#151312" className='size-5 text-secondary' />

            <Text className='text-secondary font-semibold'>{text}</Text>

        </ImageBackground>
    ) : (

        <View className='min-w-[20px] flex-col justify-center items-center mt-4'>
            <Image source={icon} className='size-5' tintColor={'#a8b5db'} />
        </View>
    )
}


const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                },
                tabBarStyle: {
                    backgroundColor: "#0f0d23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    borderWidth: 1,
                    borderColor: "#0f0d23",
                    position: "absolute",
                }


            }}

        >


            <Tabs.Screen
                name="Register"
                options={{
                    title: 'Register',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon
                            focused={focused}
                            text="Sign Up"
                            icon={icons.register}
                        />
                }}
            />

            <Tabs.Screen
                name="Login"
                options={{
                    title: "Login",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon
                            focused={focused}
                            text="Login"
                            icon={icons.login}
                        />
                }}
            />






        </Tabs>
    )


}

export default _layout