import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import {useUserContext} from '../hooks/ContextHooks';
import Upload from '@/views/Upload';
import Ionicons from '@expo/vector-icons/Ionicons';
import MyFiles from '@/views/MyFiles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'My Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Upload') {
            iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="My Profile" component={Profile} />
      <Tab.Screen name="Upload" component={Upload} />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const {user} = useUserContext();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <>
          <Stack.Screen
            name="Back"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Media File"
            component={Single}
            // options={{headerShown: false}}
          />
          <Stack.Screen name="My Files" component={MyFiles} />
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
