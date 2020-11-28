import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View, BackHandler, PermissionsAndroid } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Content, Form, Text, Button, Spinner, Toast } from 'native-base';
import { connect } from "react-redux";
import Global from '../../styles/Global';
import PreLoginForm from '../../styles/PreLoginForm';
import UploadPhoto from '../../components/Inputs/UploadPhoto';
import InputWithIcon from '../../components/Inputs/InputWithIcon';
import { detectHandwritten } from '../../reducers/actions';

const DetectScreen = ({ navigation, onPostDetectHandwritten, handwrittenDetect }) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Allow Camera Access",
          message:
            "This application needs to access your camera for taking pictures",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        Toast.show({
          text: 'You need to allow camera access in settings to upload pictures',
          buttonText: 'Okay',
          duration: 3000,
          type: 'error'
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const validateValues = (values) => {
    var updatedErrors = {};
    var keys = ['image', 'name'];
    var shouldDisableSubmit = true;
    keys.map((key) => {
      if (!values[key] || values[key] === '') {
        updatedErrors[key] = ' ';
      }
    });

    if (values.name && handwrittenDetect && handwrittenDetect.some(item => item.name === values.name)) {
      updatedErrors.name = 'Name already exist!';
    }

    shouldDisableSubmit = Object.keys(updatedErrors).length > 0;
    setDisableSubmit(shouldDisableSubmit);
    setErrors(updatedErrors);
    return updatedErrors;
  }

  useEffect(() => {
    validateValues(values);
    requestCameraPermission();
    navigation.setOptions({
      title: 'Detect',
      headerLeft: () => (<HeaderBackButton tintColor='#fff' onPress={() => navigation.navigate('Dashboard')} />),
    });
  }, []);

  const handleSubmitButton = async () => {
    console.log("Submit button clicked");
    const updatedErrors = validateValues(values);
    if (Object.keys(updatedErrors).length == 0) {
      setIsLoading(true);
      const resp = await onPostDetectHandwritten(values);
      setIsLoading(false);
      validateValues({});
      if (resp && resp.response) {
        setValues({});
        navigation.navigate('Detect Details', { detect: resp.response });
      }
      else {
        if (resp && resp.error) {
          let message = 'Error detecting image. Please try again';
          if (resp.error && resp.error.data && resp.error.data.message) {
            message = resp.error.data.message
          }
          Toast.show({
            text: message,
            buttonText: 'Okay',
            duration: 3000
          });
          setValues({});
        }
      }
    }
  }

  const handleTextChange = (key, value) => {
    const updatedValues = { ...values, [key]: value };
    setValues(updatedValues);
    validateValues(updatedValues);
  }


  const handleRemoveImages = (key, value) => {
    const updatedValues = { ...values };
    delete updatedValues[key];
    setValues(updatedValues);
  }

  return (
    <ScrollView style={Global.body} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
      {isLoading && <View style={Global.spinnerContainer}><Spinner style={Global.spinner} /></View>}
      <Content contentContainerStyle={PreLoginForm.container}>
        <Form>
          <View style={{ marginBottom: 50 }}>
            <Text style={{ position: 'relative', left: 50, fontSize: 19, marginBottom: 20 }}>Upload Image</Text>
            <UploadPhoto photo={values.image} name="image" handleRemoveImages={(text) => handleRemoveImages('image', text)} onChangeText={(text) => handleTextChange('image', text)} />
          </View>
          <View style={{ marginBottom: 25 }}>
            <InputWithIcon
              placeholder='Name'
              icon='home'
              name='name'
              value={values.name}
              error={errors.name}
              onChangeText={(text) => handleTextChange('name', text)} />
          </View>
          <View style={PreLoginForm.submitButtonContainer}>
            <Button success disabled={disableSubmit} style={PreLoginForm.loginButton} title="Register" onPress={() => handleSubmitButton()}><Text>Submit</Text></Button>
          </View>
        </Form>
      </Content>
    </ScrollView>
  )
}

const mapDispatchToProps = dispatch => ({
  onPostDetectHandwritten: (data) => dispatch(detectHandwritten(data)),
});

const mapStateToProps = state => ({
  handwrittenDetect: state.home.handwrittenDetect,
});

export default connect(mapStateToProps, mapDispatchToProps)(DetectScreen);