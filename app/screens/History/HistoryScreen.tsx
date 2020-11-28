import React, { useEffect } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { connect } from "react-redux";
import { HeaderBackButton } from '@react-navigation/stack';
import moment from 'moment';
import { getDetectHandwritten } from '../../reducers/actions';
import { Badge, Col, Item, ListItem, Card, Left, Right, Icon, Row, Text, Button } from 'native-base';
import Global from '../../styles/Global';
import History from '../../styles/History';

const HistoryScreen = ({ navigation, onGetDetectHandwritten, handwrittenDetect }) => {

  useEffect(() => {
    const handleGetDetectHandwritten = async () => {
      await onGetDetectHandwritten();
    }
    handleGetDetectHandwritten();
    navigation.setOptions({
      title: 'History',
      headerLeft: () => (<HeaderBackButton tintColor='#fff' onPress={() => navigation.navigate('Dashboard')} />),
    });
  }, []);

  const handwrittenDetectList = handwrittenDetect ? handwrittenDetect.map((item, idx) => {
    return <ListItem key={idx} style={{ borderBottomWidth: 0 }}>
      <View style={History.container}>
        <View style={History.item}>
          <Card style={History.cardStyle}>
            <Row>
              <Col>
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </View>
              </Col>
              <Col>
                <View style={{ position: 'relative', padding: 20, fontSize: 25, marginTop: 50 }}>
                  <Text style={{color: '#3AA964', fontSize: 20, fontWeight: '700'}}>
                    {
                      item.is_correct ? (
                        'Correct'
                      ) : (
                          'Not Correct'
                        )
                    }
                  </Text>
                </View>
              </Col>
            </Row>
          </Card>
        </View>
      </View>
    </ListItem>;

  }) : null;


  return (
    <ScrollView style={Global.body}>
      {handwrittenDetectList}
    </ScrollView>
  )
}

const mapDispatchToProps = dispatch => ({
  onGetDetectHandwritten: (data) => dispatch(getDetectHandwritten(data)),
});

const mapStateToProps = state => ({
  handwrittenDetect: state.home.handwrittenDetect,
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
