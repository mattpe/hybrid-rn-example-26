import {Controller, useForm} from 'react-hook-form';
import {useUserContext} from '../hooks/ContextHooks';
import * as ImagePicker from 'expo-image-picker';
import {Image, Pressable, View} from 'react-native';
import {Input} from '@/components/ui/input';
import {Text} from '@/components/ui/text';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Separator} from '@/components/ui/separator';
import {useState} from 'react';

type UploadInputs = {
  title: string;
  description: string;
};

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const {user} = useUserContext();
  const initValues: UploadInputs = {title: '', description: ''};
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const doUpload = async (inputs: UploadInputs) => {
    console.log(inputs);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 0.6,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  return (
    <View className="p-4">
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'title is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      <Text>{errors.title?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'description is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Textarea
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            numberOfLines={4}
            className="bg-white"
          />
        )}
        name="description"
      />
      <Text>{errors.description?.message}</Text>
      <Separator className="py-2" />
      <Pressable onPress={pickImage}>
        <Image
          source={{uri: image && image.assets ? image.assets[0].uri : ''}}
          className="h-[220px] w-full"
        />
      </Pressable>

      <Button onPress={handleSubmit(doUpload)}>
        <Text>Upload</Text>
      </Button>
    </View>
  );
};

export default Upload;
