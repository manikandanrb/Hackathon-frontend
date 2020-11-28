import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { connect } from "react-redux";
import { HeaderBackButton } from '@react-navigation/stack';
import moment from 'moment';
import { getDetectHandwritten } from '../../reducers/actions';
import { Badge, Col, Item, ListItem, Card, Left, Right, Icon, Row, Text, Picker, Button } from 'native-base';
import Global from '../../styles/Global';
import History from '../../styles/History';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HistoryScreen = ({ navigation, onGetDetectHandwritten, handwrittenDetect }) => {

  const [filterByStatus, setFilterByStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('descending')

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

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  useEffect(() => {
    handwrittenDetect && handwrittenDetect.sort((a, b) =>
      sortOrder === 'ascending'
        ? a[sortBy] < b[sortBy]
          ? -1
          : 1
        : a[sortBy] > b[sortBy]
          ? -1
          : 1
    )
  }, [handwrittenDetect])

  const handwrittenDetectList = handwrittenDetect ? handwrittenDetect
    .sort((a, b) =>
      sortOrder === 'ascending'
        ? a[sortBy] < b[sortBy]
        : a[sortBy] > b[sortBy]
    )
    .map((item, idx) => {
      return filterByStatus === 'all' ||
        item.status === filterByStatus ? (<ListItem key={idx} style={{ borderBottomWidth: 0 }} onPress={() => navigation.navigate('Detect Details', { detect: item })}>
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
                    <View style={{ position: 'relative', padding: 20 }}>
                      <View style={{ margin: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Name</Text>
                        <Text>{item.name}</Text>
                      </View>
                      <View style={{ margin: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Status</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <View style={{
                            width: 12,
                            height: 12,
                            marginTop: 6,
                            borderRadius: 20,
                            backgroundColor: item.status === 'failed' ?
                              'red' : item.status === 'completed' ?
                                'green' : item.status === 'partial' ?
                                  'orange' : 'blue',
                          }}>
                          </View>
                          <View style={{
                            marginLeft: 10
                          }}>
                            <Text>
                              {capitalize(item.status)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Col>
                </Row>
              </Card>
            </View>
          </View>
        </ListItem>) : null

    }) : null;


  return (
    <ScrollView style={Global.body}>
      <View style={History.HeaderContainer}>
        <View style={{ position: 'relative', width: '100%', borderRadius: 10, borderColor: '#ddd', borderWidth: 1, height: 60 }}>
          <Row style={{ marginTop: 10 }}>
            <Col style={{ margin: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Row>
                  <Col style={{ width: 50 }}>
                    <TouchableOpacity onPress={() => setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')}>
                      <Icon name={sortOrder === 'ascending' ? 'sort-amount-asc' : 'sort-amount-desc'} type="FontAwesome" style={{ fontSize: 20, color: '#3AA964' }} />
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <View style={{ marginTop: -15, width: 100, alignSelf: 'flex-end' }}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Sort By"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={sortBy}
                        onValueChange={(value) => setSortBy(value)}
                      >
                        <Picker.Item label="Name" value="name" />
                        <Picker.Item label="Created At" value="created_at" />
                      </Picker>
                    </View>
                  </Col>
                </Row>
              </View>
            </Col>
            <Col style={{ margin: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Row>
                  <Col style={{ width: 30 }}>
                    <Icon name="filter" type="AntDesign" style={{ fontSize: 25, color: '#3AA964' }} />
                  </Col>
                  <Col>
                    <View style={{ marginTop: -15, width: 100, alignSelf: 'flex-end' }}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Status"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={filterByStatus}
                        onValueChange={(value) => setFilterByStatus(value)}
                      >
                        <Picker.Item label="All" value="all" />
                        <Picker.Item label="Completed" value="completed" />
                        <Picker.Item label="Partial" value="partial" />
                        <Picker.Item label="Failed" value="failed" />
                      </Picker>
                    </View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
      </View>
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
