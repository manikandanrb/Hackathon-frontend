import React, { useState } from 'react';
import { View } from 'react-native';
import { Item, Input, Icon, Label, Text } from 'native-base';

import PreLoginForm from '../../../styles/PreLoginForm';

const InputWithIcon = (props) => {

    const successIndicator = props.error ? null : <Icon error type='FontAwesome' name='check-circle' style={PreLoginForm.rightSideIcon} />;
    const errorMessage = props.error ? <Text style={PreLoginForm.errorMessage}>{props.error}</Text> : <Text style={PreLoginForm.errorMessage}> </Text>;

    let onChangeText = props.onChangeText;
    if (props.allowOnlyNumbers) {
        onChangeText = (text) => {
            props.onChangeText(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
        }
    }
    return (
    <View>
        <Item success={props.error ? false : true} style={PreLoginForm.textField}>
            <Icon active type={props.iconType ? props.iconType : 'FontAwesome'} name={props.icon} style={PreLoginForm.inputIcon} />
            <Input placeholder={props.placeholder} type={props.type} name={props.name} value={props.value} onChangeText={onChangeText} disabled={props.disabled} keyboardType={props.type === 'number' ? 'numeric' : null} maxLength={props.maxLength ? props.maxLength : 255} />
            {successIndicator}
        </Item>
        {errorMessage}
    </View>
    );
}

export default InputWithIcon;
