import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        fontFamily: 'Ubuntu-Medium'
    },
    spinnerContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    spinner: {
        top: '45%',
    },
    flatListView: {
        backgroundColor: '#fff',
        height: 'auto',
        width: '100%'
    }
});
