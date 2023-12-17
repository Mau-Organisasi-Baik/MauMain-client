
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from './src/navigator/StackNavigator';
import ToastManager from 'toastify-react-native'
import { LoginProvider } from './src/context/AuthContext';

export default function App() {
 
  return (
    <NavigationContainer>
      <LoginProvider>
      <StackNavigator />
      </LoginProvider>
      <ToastManager/>
    </NavigationContainer>
  );
}

