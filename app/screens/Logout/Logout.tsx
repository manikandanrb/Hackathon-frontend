import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { logout } from '../../reducers/actions';

const LogoutScreen = ({ navigation, onLogout }) => {
    useEffect(() => {
        navigation.setOptions({ title: 'Logout', headerRight: null });
        const getLogout = async () => {
            const resp = await onLogout();
            navigation.navigate('Login');
        }
        getLogout();
    }, []);
    return (<></>);
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logout()),
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
