import { createStackNavigator } from '@react-navigation/stack'
import CategoryList from './components/CategoryList';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

const Stack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Категории" component={CategoryList} initialParams={{level: 1, name: 'Все категории'}} options={({route}) => ({title: route.params.name})}/>
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
  )
}