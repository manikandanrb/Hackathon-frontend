import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Container, Content, Card, CardItem, Text, Body, Icon } from 'native-base';
import { ScrollView, View, TouchableOpacity, Image } from 'react-native';
import Dashboad from '../../styles/Dashboard';
import Global from '../../styles/Global';

const DashboardScreen = ({ navigation, user }) => {

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  useEffect(() => {
    navigation.setOptions({ title: 'Expression Evaluator' });
  }, [user])

  return (
    <ScrollView style={Global.body}>
      <Container style={Dashboad.dashboardContainer}>
        <Content>
          <View style={{ marginTop: 30, marginBottom: 20 }}>
            <Text style={Dashboad.contentText}>
              Hello <Text style={{ color: '#3AA964', fontSize: 25 }}>{user ? capitalize(user.name) : 'New User'}!</Text>
            </Text>
          </View>
          <View style={Dashboad.container}>
            <View style={Dashboad.item}>
              <TouchableOpacity onPress={() => navigation.navigate('Detect')}>
                <Card style={Dashboad.cardStyle}>
                  <View>
                    <Icon type="AntDesign" name="find" style={{ color: "#ffffff", fontSize: 60 }} />
                  </View>
                  <Text style={Dashboad.cardText}>
                    Evaluate
                  </Text>
                </Card>
              </TouchableOpacity>
            </View>
            <View style={Dashboad.item}>
              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <Card style={Dashboad.cardStyle}>
                  <View>
                    <Icon type="MaterialIcons" name="history" style={{ color: "#ffffff", fontSize: 60 }} />
                  </View>
                  <Text style={Dashboad.cardText}>
                    History
                  </Text>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    </ScrollView>
  )
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
  user: state.home.user
});


export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
