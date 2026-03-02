import {useMedia} from '../hooks/apiHooks';
import {FlatList, View} from 'react-native';
import MediaListItem from '../components/MediaListItem';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

const Home = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray} = useMedia();

  return (
    <FlatList
      className="px-3"
      data={mediaArray}
      keyExtractor={(item) => item.media_id.toString()}
      ListHeaderComponent={() => <View className="h-3" />}
      ItemSeparatorComponent={() => <View className="h-3" />}
      ListFooterComponent={() => <View className="h-3" />}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <MediaListItem item={item} navigation={navigation} />
      )}
    />
  );
};

export default Home;
