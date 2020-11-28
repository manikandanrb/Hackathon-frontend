import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'stretch',
    },
    item: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height: '100%',
    },
    cardStyle: {
        width: '100%',
        height: 180,
        justifyContent:'center',
        alignItems: 'center',        
        alignSelf: 'center',
        borderRadius: 15,
        overflow: 'hidden',
    },
    cardIcon: {
        fontSize: 50,
        color: '#ff5222',
        width: 50,
        height: 50,
        marginTop: 30
    },
    card: {
        height: 140,
        width: '100%',
        marginTop: 30,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    contentText: {
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
    },
    cardText: {
        textAlign: 'center',
        fontSize: 22,
        color: '#fff',
        height: 'auto',
    }
});
