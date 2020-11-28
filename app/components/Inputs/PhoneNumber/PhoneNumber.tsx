import React from 'react';
import { View } from 'react-native';
import { Item, Input, Icon, Label, Text } from 'native-base';

import PreLoginForm from '../../../styles/PreLoginForm';

const PhoneNumber = (props) => {

    const successIndicator = props.error ? null : <Icon error type='FontAwesome' name='check-circle' style={PreLoginForm.rightSideIcon} />;
    const errorMessage = props.error ? <Text style={PreLoginForm.errorMessage}>{props.error}</Text> : <Text style={PreLoginForm.errorMessage}> </Text>;
    return (
    <View>
        <Item success={props.error ? false : true} style={PreLoginForm.textField}>
            <Icon active type={props.iconType ? props.iconType : 'FontAwesome'} name={props.icon} style={PreLoginForm.inputIcon} />
            <Input placeholder={props.placeholder} type='number' name={props.name} value={props.value} onChangeText={(text) => props.onChangeText(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))} disabled={props.disabled} floatingLabel={true} keyboardType="numeric" />
            {successIndicator}
        </Item>
        {errorMessage}
    </View>
    );
}

export default PhoneNumber;
