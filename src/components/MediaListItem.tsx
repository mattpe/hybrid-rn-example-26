import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {MediaItemWithOwner} from 'hybrid-types';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

const MediaListItem = ({
  item,
  navigation,
}: {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log('touched ' + item.title);
        navigation.navigate('Media File', {item});
      }}
    >
      <Text className=" bg-red-500 m-4">{item.title}</Text>
      <Image style={styles.image} source={{uri: item.thumbnail}} />
      <Text>{item.description}</Text>
      <Text>
        Created at: {new Date(item.created_at).toLocaleString('fi-FI')}
      </Text>
      <Text>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</Text>
      <Text>Mime-type: {item.media_type}</Text>
      <Text>Owner: {item.username}</Text>
      {/* TODO = HOMEWORK: add all other media data and style your list & listitems */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 5, marginBottom: 5, backgroundColor: '#f5c668'},
  title: {fontSize: 20},
  image: {height: 300},
});

export default MediaListItem;
