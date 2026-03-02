import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import MediaListItem from '../components/MediaListItem';
import {useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';
import {MediaItemWithOwner} from 'hybrid-types';
import {Text} from '../components/ui/text';

const MyFiles = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  const {user} = useUserContext();
  const {getUserMediaByToken} = useMedia(false);

  useEffect(() => {
    const loadMyFiles = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setMediaArray([]);
          return;
        }

        const media = await getUserMediaByToken(token, user?.username ?? 'me');
        setMediaArray(media);
      } catch (error) {
        console.error(error);
      }
    };

    loadMyFiles();
  }, [getUserMediaByToken, user?.username]);

  return (
    <FlatList
      className="px-3"
      data={mediaArray}
      keyExtractor={(item) => item.media_id.toString()}
      ListHeaderComponent={() => <View className="h-3" />}
      ItemSeparatorComponent={() => <View className="h-3" />}
      ListFooterComponent={() => <View className="h-3" />}
      ListEmptyComponent={() => (
        <View className="items-center py-6">
          <Text className="text-muted-foreground">No files found.</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <MediaListItem item={item} navigation={navigation} />
      )}
    />
  );
};

export default MyFiles;
