import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { Schedules } from "../screens/admin/Schedules";
import { AdminReservation } from "../screens/admin/AdminReservation";
import { CreateField } from "../screens/admin/CreateField";
import { AdminField } from "../screens/admin/AdminField";
import { useContext } from "react";
import { LoginContext } from "../context/AuthContext";
import { PinpointField } from "../screens/admin/PinpointField";

const Tab = createBottomTabNavigator();

export const AdminBottomTab = ({ navigation }) => {
  const { userInfo, isProfileValid } = useContext(LoginContext);

  if (isProfileValid) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Reservations"
          component={AdminReservation}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? "list" : "list-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />

        <Tab.Screen
          name="Schedules"
          component={Schedules}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? "today" : "today-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="My Field"
          component={AdminField}
          options={{
            // headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? "golf" : "golf-outline";
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
        name="createField"
        component={CreateField}
        options={{
          headerTitle: "Create Field Profile",
          // headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "golf" : "golf-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
