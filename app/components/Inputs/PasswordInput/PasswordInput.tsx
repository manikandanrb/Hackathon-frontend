import React, { useState } from 'react';
import { View } from 'react-native';
import { Item, Input, Icon, Label, Text } from 'native-base';

import PreLoginForm from '../../../styles/PreLoginForm';

const PasswordInput = (props) => {
    const [icon, setIcon] = useState('eye-slash');
    const [hidePassword, setHidePassword] = useState(true);

    const successIndicator = props.error ? null : <Icon error type='FontAwesome' name='check-circle' style={PreLoginForm.rightSideIcon} />;
    const errorMessage = props.error ? <Text style={PreLoginForm.errorMessage}>{props.error}</Text> : <Text style={PreLoginForm.errorMessage}> </Text>;

    const changeIcon = () => {
        const newIcon = icon == 'eye' ? 'eye-slash' : 'eye';
        setIcon(newIcon);
        setHidePassword(!hidePassword);
    }

    return (
        <View>
            <Item style={PreLoginForm.passTextField} success={props.error ? false : true}>
                <Icon type='FontAwesome' name='lock' style={PreLoginForm.inputIcon} />
                <Input secureTextEntry={hidePassword} placeholder={props.placeholder} type={props.type} name={props.name} value={props.value} onChangeText={props.onChangeText} />
                <Icon type='FontAwesome' name={icon} style={PreLoginForm.rightSideIcon} onPress={() => changeIcon()} />
            </Item>
            {errorMessage}
        </View>
    );
}

export default PasswordInput;
