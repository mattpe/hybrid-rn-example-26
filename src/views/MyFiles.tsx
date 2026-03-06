import {useMedia} from '../hooks/apiHooks';
import {FlatList} from 'react-native';
import MediaListItem from '../components/MediaListItem';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

const MyFiles = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray} = useMedia(true, true);

  return (
    <FlatList
      data={mediaArray.reverse()}
      renderItem={({item}) => (
        <MediaListItem item={item} navigation={navigation} />
      )}
    />
  );
};

export default MyFiles;
