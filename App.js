import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from  '@react-navigation/stack';
import Proba from "./Proba";
import Proba2 from "./Proba2";
import Proba3 from "./Proba3";
import Kepfeltolt from "./Kepfeltolt";
import Felvitel from "./Felvitel"

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      <Button
        onPress={() => navigation.navigate('Próba')}
        title="Go to PróbaScreen"
      />
      <Button
        onPress={() => navigation.navigate('Próba2')}
        title="Go to Próba2Screen"
      />
      <Button
        onPress={() => navigation.navigate('Próba3')}
        title="Go to Próba3Screen"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <Button
        onPress={() => navigation.navigate('Próba')}
        title="Go to PróbaScreen"
      />
      <Button
        onPress={() => navigation.navigate('Próba2')}
        title="Go to Próba2Screen"
      />
      <Button
        onPress={() => navigation.navigate('Próba3')}
        title="Go to Próba3Screen"
      />
    </View>
  );
}
function Root({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Root">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Kepfeltolt" component={Kepfeltolt} />
        <Drawer.Screen name="Felvitel" component={Felvitel} />
      </Drawer.Navigator>
  );
}
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Root" component={Root} options={{headerShown:false}}/>
      <Stack.Screen name="Próba" component={Proba} />
      <Stack.Screen name="Próba2" component={Proba2} />
      <Stack.Screen name="Próba3" component={Proba3} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}