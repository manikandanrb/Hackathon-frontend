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
          opacity: props.photo ? 1 : 0.5,
          borderRadius: props.borderRadius
        }}
        resizeMode='cover'
        source={{
          uri: props.photo ? props.photo : emptyImage
        }}
      />
      {
        !props.photo ? (
          <View style={PreLoginForm.imageEditIcon}>
            <Icon active type='AntDesign' name='clouduploado' style={{ marginLeft: 1, fontSize: 50, color: '#fff' }} />
          </View>
        ) : null
      }
    </PhotoUpload>
  )
}

export default UploadPhoto;