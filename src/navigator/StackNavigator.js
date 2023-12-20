import { createStackNavigator } from "@react-navigation/stack";
import { LoginForm, RegisterForm } from "../screens/auth/AuthForm";
import { GetStarted } from "../screens/auth/GetStarted";
import { ReservationCard } from "../screens/player/ReservationCard";
import { MyTabs } from "./BottomTabNavigator";
import { ReserveField } from "../screens/player/ReserveField";
import ChatComponent from "../screens/player/Chat";
import { AdminBottomTab } from "./AdminBottomTab";
import { AdminScheduleForm } from "../screens/admin/AdminScheduleForm";
import { AdminDetailReservation } from "../screens/admin/AdminDetailReservation";
import { LoginContext } from "../context/AuthContext";
import { useContext } from "react";
import { PinpointField } from "../screens/admin/PinpointField";
import { PlayerCard } from "../components/card/PlayerCard";
import { PlayerProfile } from "../screens/player/PlayerProfile";

export const StackNavigator = () => {
  const Stack = createStackNavigator();
  const { isLoggedIn, userInfo } = useContext(LoginContext);
  return (
    <Stack.Navigator>
      {isLoggedIn && userInfo ? (
        <>
          {/* Di StackScreen MainScreen nanti dimainin perkondisian
        di componentnya kalau si user ini admin atau engga */}
          <Stack.Screen
            name="Main Screen"
            component={userInfo.role === "player" ? MyTabs : AdminBottomTab}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Reservation Card" component={ReservationCard} />
          <Stack.Screen name="Reservation Room" component={ReserveField} />
          <Stack.Screen name="Chat" component={ChatComponent} />
          <Stack.Screen
            name="ScheduleForm"
            component={AdminScheduleForm}
            options={{
              title: "Schedule Form",
            }}
          />
          <Stack.Screen
            name="AdminDetailReservation"
            component={AdminDetailReservation}
            options={{
              headerTitle: "Detail Reservation",
            }}
          />
          <Stack.Screen
            name="pinpointField"
            component={PinpointField}
            options={{
              headerTitle: "Pinpoint Field Location",
              // headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = focused ? "pin" : "pin-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            }}
          />
          <Stack.Screen
            name="PlayerProfile"
            component={PlayerProfile}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginForm}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Get Started" component={GetStarted} />
          <Stack.Screen
            name="Register"
            component={RegisterForm}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
