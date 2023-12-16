
import { NavigationContainer } from '@react-navigation/native';

import { MyTabs } from './src/navigator/BottomTabNavigator';
import { StackNavigator } from './src/navigator/StackNavigator';


export default function App() {
 
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

