import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Explore } from "../screens/player/Explore";

import { Ionicons } from "@expo/vector-icons";

import { Inbox } from "../screens/player/Inbox";
import { Profile } from "../screens/player/Profile";
import { useContext } from "react";
import { LoginContext } from "../context/AuthContext";
import { CreateProfile } from "../screens/player/CreateProfile";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  const { userInfo, isProfileValid } = useContext(LoginContext);
  if (isProfileValid) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? "search" : "search-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />

        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? "file-tray" : "file-tray-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? "person" : "person-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Create Profile"
        component={CreateProfile}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
