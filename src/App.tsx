import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Navigator from './navigators/Navigator';
import {UserProvider} from './contexts/UserContext';

const App = () => {
  //console.log('First app version working!!');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <UserProvider>
          <Navigator />
        </UserProvider>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

export default App;
