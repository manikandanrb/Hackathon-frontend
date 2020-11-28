import { StyleSheet } from "react-native";

export default StyleSheet.create({
    sideBar: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#3AA964',
        color: '#035703',
        paddingLeft: 30,
        paddingRight: 30,
        
    },
    listItem: {
        color: '#035703',
        borderBottomWidth: 0,
    },
    menuIcon: {
        alignSelf: 'center',
        padding: '7%',
        width: '15%',
        height: 35,
        marginRight:'5%'
    },
    sideMenuTitle: {
        marginLeft: 20,
        marginBottom: 30
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    menuText: {
        color: '#fff',
        marginLeft: 20
    },
    header: {
        marginTop: 20,
        marginBottom: 20
    },
    userInfosHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    userInfos: {
        height: 50,
        width: 130,
        position: 'relative',
        justifyContent: 'center'
    },
    username: {
        fontWeight: '700',
        color: '#fff',
        fontSize: 20
    }
});
