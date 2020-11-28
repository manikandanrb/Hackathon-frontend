import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Button, Content, Form, Text, Spinner } from 'native-base';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PreLoginForm from '../../styles/PreLoginForm';
import Global from '../../styles/Global';
import PasswordInput from '../../components/Inputs/PasswordInput';
import PhoneNumber from '../../components/Inputs/PhoneNumber';
import { doLogin } from '../../reducers/actions';


const LoginScreen = ({ navigation, onLogin }) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateValues = (values) => {
        var updatedErrors = {};
        var keys = ['phone_number', 'password'];
        var shouldDisableSubmit = true;
        keys.map((key) => {
            if (!values[key] || values[key] === '') {
                updatedErrors[key] = ' ';
            }
        });

        if (values.phone_number && (!values.phone_number || values.phone_number.length != 10)) {
            updatedErrors.phone_number = 'Invalid phone number';
            if (showPassword) {
                setShowPassword(false);
            }
        } else if (!updatedErrors.phone_number) {
            if (!showPassword) {
                setShowPassword(true);
            }
        }

        shouldDisableSubmit = Object.keys(updatedErrors).length > 0;
        setDisableSubmit(shouldDisableSubmit);
        setErrors(updatedErrors);
        return updatedErrors;
    }

    useEffect(() => {
        validateValues(values);
        navigation.setOptions({
            title: 'Login'
        });
    }, []);

    const handleSubmitButton = async () => {
        console.log("Submit button clicked");
        const updatedErrors = validateValues(values);
        if (Object.keys(updatedErrors).length == 0) {
            setIsLoading(true);
            const resp = await onLogin(values);
            setIsLoading(false);
            validateValues({});
            if (resp.response) {
                setValues({});
                setShowPassword(false);
                navigation.navigate('Dashboard');
            }
            else{
                setValues({});
            }
        }
    }

    const handleTextChange = (key, value) => {
        const updatedValues = { ...values, [key]: value };
        setValues(updatedValues);
        validateValues(updatedValues);
    }

    return (
        <ScrollView style={Global.body} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
            {isLoading && <View style={Global.spinnerContainer}><Spinner style={Global.spinner} /></View>}
            <Content contentContainerStyle={PreLoginForm.container}>
                <View style={PreLoginForm.logo}>
                    <Image style={{width: 150, height: 150}} source={require('../../images/logo.png')} />
                </View>
                <Form>
                    <PhoneNumber placeholder="10 digit Phone Number" icon='phone' type='number' name='phone_number' error={errors.phone_number} value={values.phone_number} onChangeText={(text) => handleTextChange('phone_number', text)} />

                    {showPassword && <PasswordInput placeholder="Password" icon='lock' type='text' name='password' error={errors.password} value={values.password} onChangeText={(text) => handleTextChange('password', text)} />}

                    <View style={PreLoginForm.submitButtonContainer}>
                        <Button success disabled={disableSubmit} style={PreLoginForm.loginButton} title="Register" onPress={() => handleSubmitButton()}><Text>Login</Text></Button>
                    </View>
                </Form>
            </Content>
        </ScrollView>
    );
};

LoginScreen.propsType = {
    onLogin: PropTypes.func,
};


const mapDispatchToProps = dispatch => ({
    onLogin: (loginUser) => dispatch(doLogin(loginUser)),
});

const mapStateToProps = state => ({
    user: state.home.user,
    error: state.home.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
