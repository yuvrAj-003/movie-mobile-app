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
            className='flex flex-row min-w-[101px] min-h-[53px] justify-center items-center overflow-hidden rounded-full gap-1 mt-4'
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
                name="index"
                options={{
                    title: "home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon
                            focused={focused}
                            text="Home"
                            icon={icons.home}
                        />
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: 'search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon
                            focused={focused}
                            text="Search"
                            icon={icons.search}
                        />
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon
                            focused={focused}
                            text="Profile"
                            icon={icons.person}
                        />
                }}
            />



            <Tabs.Screen
                name="saved"
                options={{
                    title: 'saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon
                            focused={focused}
                            text="Saved"
                            icon={icons.save}
                        />
                }}
            />


        </Tabs>
    )


}

export default _layout