import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Icon, Text, List, ListItem, View, Thumbnail } from "native-base";
import Sidebar from '../../styles/Sidebar';

const SideBar = ({ navigation, user }) => {

  let routes = [];

  const loggedInRoutes = ['Dashboard', 'Detect', 'History', 'Logout'];
  const nonLoggedInRoutes = ['Login', 'Registration'];
  const [updatedRoutes, setUpdatedRoutes] = useState([]);
  useEffect(() => {
    const routes = [
      {
        type: 'AntDesign',
        icon: 'home',
        label: 'Home',
        name: 'Dashboard',
      }, {
        type: 'AntDesign',
        icon: 'login',
        label: 'Login',
        name: 'Login',
      },
      {
        type: 'AntDesign',
        icon: 'adduser',
        label: 'Registration',
        name: 'Registration',
      },
      {
        type: 'AntDesign',
        icon: 'find',
        label: 'Detect',
        name: 'Detect',
      },
      {
        type: 'MaterialIcons',
        icon: 'history',
        label: 'History',
        name: 'History',
      },
      {
        type: 'AntDesign',
        icon: 'logout',
        label: 'Logout',
        name: 'Logout',
      }
    ];
    const currentRoutes = routes.filter((route) => {
      if (user && nonLoggedInRoutes.indexOf(route.name) > -1) {
        return false;
      } else if (!user && loggedInRoutes.indexOf(route.name) > -1) {
        return false;
      }
      return true;
    });
    setUpdatedRoutes(currentRoutes);
  }, [user]);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <View style={Sidebar.sideBar}>
      {
        user ? (
          <View style={Sidebar.header}>
            <View style={Sidebar.userInfosHolder}>
              <Image style={Sidebar.avatar} source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} />
              <View style={Sidebar.userInfos}>
                <Text style={Sidebar.username}>{user.name}</Text>
              </View>
            </View>
          </View>
        ) : null
      }
      <List
        dataArray={updatedRoutes}
        style={{paddingTop: user ? 0 : 30}}
        renderRow={data => {
          return (
            <ListItem
              button
              style={Sidebar.listItem}
              onPress={() => { if (data.name) { navigation.navigate(data.name) } }}>
              <Icon type={data.type} name={data.icon} style={{ color: "#ffffff" }} size={25} />
              <Text style={Sidebar.menuText}>{data.label}</Text>
            </ListItem>
          );
        }}
      />
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
  user: state.home.user
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);