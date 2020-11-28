import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Image, ScrollView, View, BackHandler } from 'react-native';
import { Content } from 'native-base';
import Global from '../../styles/Global';
import PreLoginForm from '../../styles/PreLoginForm';
import { getProfileData } from '../../reducers/actions';

const SplashScreen = ({ navigation, profileData }) => {

    useEffect(() => {
        const getProfile = async () => {
            const resp = await profileData();
            if (resp.response) {
                navigation.navigate('Dashboard');
            }
            else {
                navigation.navigate('Login');
            }
        }
        const exitApp = () => {
            BackHandler.exitApp();
        }
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            exitApp
        );
        navigation.setOptions({ headerTransparent: true, headerRight: null });
        getProfile();
    }, []);

    return (
        <ScrollView style={Global.body}>
            <Content contentContainerStyle={{ marginTop: '60%' }}>
                <View style={PreLoginForm.logo}>
                    <Image style={{width: 150, height: 150}} source={require('../../images/logo.png')} />
                </View>
            </Content>
        </ScrollView>
    )
}

SplashScreen.propsType = {
    profileData: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
    profileData: () => dispatch(getProfileData()),
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
