import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        paddingVertical: '10%'
    },
    registerContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingVertical: '5%'
    },
    logo: {
        marginBottom: 40,
        alignItems: 'center'
    },
    introScreenLogo: {
        alignItems: 'center',
        marginTop: 20
    },
    textField: {
        width: '80%',
        marginLeft: '10%',
        paddingLeft: 15,
        backgroundColor: '#fff'
    },
    textAreaField: {
        width: '80%',
        marginLeft: '10%',
        backgroundColor: '#fff'
    },
    passTextField: {
        width: '80%',
        marginLeft: '10%',
        paddingLeft: 15,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    dateField: {
        width: '80%',
        marginLeft: '10%',
        paddingLeft: 15,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    submitButtonContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitProfileButtonContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    submitButton: {
        width: '80%',
        marginLeft: '10%',
        marginTop: 30,
        justifyContent: 'center',
    },
    loginButton: {
        width: '80%',
        marginLeft: '10%',
        justifyContent: 'center',
    },
    rightSideIcon: {
        fontSize: 15
    },
    inputIcon: {
        fontSize: 20,
        color: '#777777'
    },
    dropdownField: {
        width: '80%',
        marginLeft: '10%',
        paddingLeft: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    imageEditIcon: {
        padding: 3,
        position: "absolute",
        top: 50,
        width: 60,
        height: 60,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "#3AA964",
        borderRadius: 50
    },
    errorMessage: {
        fontSize: 13,
        color: 'red',
        marginLeft: '10%',
        paddingLeft: 15
    },
    inputStyle: {
        borderWidth: 0,
        width: '80%'
    },
    text: {
        marginLeft: '10%',
        width: '80%',
        marginTop: 20,
        textAlign: 'center'
    }
});
