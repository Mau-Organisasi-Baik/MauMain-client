
import { NavigationContainer } from '@react-navigation/native';

import { MyTabs } from './src/navigator/BottomTabNavigator';


export default function App() {
 
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


