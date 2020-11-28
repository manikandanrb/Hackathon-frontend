import React from 'react';
import { Image } from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import { Icon, View } from 'native-base';

import PreLoginForm from '../../../styles/PreLoginForm';

const UploadPhoto = (props) => {

  const emptyImage = 'https://i0.wp.com/www.signagekings.ng/wp-content/uploads/2016/04/dummy-post-square-1.jpg';

  return (
    <PhotoUpload
      name={props.name}
      onPhotoSelect={props.onChangeText}
    >
      <Image
        style={{
          paddingVertical: 30,
          width: 300,
          height: 170,
          borderRadius: props.borderRadius
        }}
        resizeMode='cover'
        source={{
          uri: props.photo ? props.photo : emptyImage
        }}
      />
      <View style={PreLoginForm.imageEditIcon}>
        <Icon active type='MaterialIcons' name='edit' style={{ marginLeft: 1, fontSize: 13, color: '#fff' }} />
      </View>
    </PhotoUpload>
  )
}

export default UploadPhoto;