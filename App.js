
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from './src/navigator/StackNavigator';
import ToastManager from 'toastify-react-native'

export default function App() {
 
  return (
    <NavigationContainer>
      <StackNavigator />
      <ToastManager/>
    </NavigationContainer>
  );
}

