import { createStackNavigator } from '@react-navigation/stack';
import AuthForm from '../screens/AuthForm';
import { GetStarted } from '../screens/GetStarted';

export const StackNavigator = () => {
  const Stack = createStackNavigator()
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name='Login'
          component={AuthForm}
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen 
            name='Get Started'
            component={GetStarted}
            />
          <Stack.Screen 
            name='Register'
            component={AuthForm}
            options={{
              headerShown: false,
            }}
            />
      </Stack.Navigator>
  );
}