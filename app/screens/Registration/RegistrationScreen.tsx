import React, { useState, useEffect } from 'react';
import { HeaderBackButton } from '@react-navigation/stack'

import { ScrollView, View, Image } from 'react-native';
import { Badge, Button, Container, Content, Input, Form, Text, Toast } from 'native-base';
import PreLoginForm from '../../styles/PreLoginForm';
import Global from '../../styles/Global';
import PasswordInput from '../../components/Inputs/PasswordInput';
import InputWithIcon from '../../components/Inputs/InputWithIcon';
import PhoneNumber from '../../components/Inputs/PhoneNumber';
import { validateEmail } from '../../utils/ValidateEmail';
import axios from '../../axios';

const LoginScreen = ({ navigation }) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [disableSubmit, setDisableSubmit] = useState(true);
    const fieldRef = React.createRef()

    const registerUser = (values) => {
        axios.post('signup/', values).then((response) => {
            console.log(response.data);
            setValues({});
            navigation.navigate('Login');
        }).catch((error) => {
            console.log(error.response);
            Toast.show({
                text: "Network Error, Try after some time",
                buttonText: 'Okay',
                duration: 3000,
                type: 'error'
            });
            setErrors(error.response.data);
        });
    }


    const validateValues = (values) => {
        var updatedErrors = {};
        var keys = ['name', 'email', 'phone_number', 'password'];
        var shouldDisableSubmit = true;
        keys.map((key) => {
            if (!values[key] || values[key] === '') {
                updatedErrors[key] = ' ';
            }
        });

        if (values.email && !validateEmail(values.email)) {
            updatedErrors.email = 'Invalid email address';
        }

        if (values.phone_number && (!values.phone_number || values.phone_number.length != 10)) {
            updatedErrors.phone_number = 'Invalid phone number';
        }

        if (values.password && values.password.length < 6) {
            updatedErrors.password = 'Minimum 6 characters required';
        }

        console.log(values);
        console.log(updatedErrors);
        shouldDisableSubmit = Object.keys(updatedErrors).length > 0;
        setDisableSubmit(shouldDisableSubmit);
        setErrors(updatedErrors);
        return updatedErrors;
    }

    useEffect(() => {
        validateValues(values);
        navigation.setOptions({
            title: 'Registration',
            headerLeft: () => (<HeaderBackButton tintColor='#fff' onPress={() => navigation.navigate('Login')} />)
        });

    }, []);

    const handleSubmitButton = () => {
        console.log("Submit button clicked");
        const updatedErrors = validateValues(values);
        if (Object.keys(updatedErrors).length == 0) {
            registerUser(values);
        }
    }

    const handleTextChange = (key, value) => {
        const updatedValues = {...values, [key]: value};
        setValues(updatedValues);
        validateValues(updatedValues);
    }

    return (
        <ScrollView style={Global.body} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='always'>
                <Content contentContainerStyle={PreLoginForm.registerContainer}>
                    <View style={PreLoginForm.logo}>
                        <Image style={{width: 150, height: 150}} source={require('../../images/logo.png')} />
                    </View>
                    <Form>
                        <InputWithIcon placeholder="Name" icon='user' type='text' name='name' error={errors.name} value={values.name} onChangeText={(text) => handleTextChange('name', text)}/>
                        <InputWithIcon placeholder="Email Address" icon='envelope' type='email' name='email' error={errors.email} value={values.email} onChangeText={(text) => handleTextChange('email', text)} />
                        <PhoneNumber placeholder="10 digit Phone Number" icon='phone' type='text' name='phone_number' error={errors.phone_number} value={values.phone_number} onChangeText={(text) => handleTextChange('phone_number', text)}/>
                        <PasswordInput placeholder="Password" icon='lock' type='text' name='password' error={errors.password} value={values.password} onChangeText={(text) => handleTextChange('password', text)} />
                        <View style={PreLoginForm.submitButtonContainer}>
                        <Button success disabled={disableSubmit} style={PreLoginForm.submitButton} title="Register" onPress={() => handleSubmitButton()}><Text>Register</Text></Button>
                        </View>
                    </Form>
                </Content>
        </ScrollView>
    );
};

export default LoginScreen;
