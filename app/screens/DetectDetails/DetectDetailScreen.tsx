import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Content, Form, Text, Button, Spinner, Toast, Col, Row } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';
import moment from 'moment';
import Global from '../../styles/Global';
import DetectDetails from '../../styles/DetectDetails';

const DetectDetailScreen = ({
  navigation,
  route,
}) => {

  const [detect, setDetect] = useState(null);

  useEffect(() => {
    if (route.params) {
      const detectData = route.params.detect;
      console.log(detectData);
      setDetect(detectData);
    }
    navigation.setOptions({
      title: 'Detect Details',
      headerLeft: () => (<HeaderBackButton tintColor='#fff' onPress={() => navigation.navigate('History')} />),
    });
  }, [route.params])

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  console.log(detect);

  return (
    <ScrollView style={Global.body}>
      {
        detect ? (
          <View style={DetectDetails.container}>
            <View style={DetectDetails.ImageContainer}>
              <Image
                source={{ uri: detect.image }}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
            <View style={DetectDetails.ContentItem}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Name</Text>
              <Text>{detect.name}</Text>
            </View>
            <View style={DetectDetails.ContentItem}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Created At</Text>
              <Text>{moment(detect.created_at.toString()).format('DD-MM-YYYY hh:MM')}</Text>
            </View>
            <View style={DetectDetails.ContentItem}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Image Processing Status</Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{
                  width: 12,
                  height: 12,
                  marginTop: 6,
                  borderRadius: 20,
                  backgroundColor: detect.status === 'failed' ?
                    'red' : detect.status === 'completed' ?
                      'green' : detect.status === 'partial' ?
                        'orange' : 'blue',
                }}>
                </View>
                <View style={{
                  marginLeft: 10
                }}>
                  <Text>
                    {capitalize(detect.status)}
                  </Text>
                </View>
              </View>
            </View>
            {
              detect.result.map((item, idx) => {
                return <View style={DetectDetails.ContentItem}>
                  <View style={DetectDetails.ContentItem}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Expression #{idx + 1}</Text>
                    <View>
                      <Row>
                        <Col>
                          <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start' }}>{item.exp}</Text>
                          </View>
                        </Col>
                        <Col>
                          <View>
                            <Text style={{ fontSize: 18, alignSelf: 'flex-end', color: item.isValid ? 'green': 'red' }}>
                              {item.isValid ? 'Correct' : 'Not Correct'}
                            </Text>
                          </View>
                        </Col>
                      </Row>
                    </View>
                  </View>
                </View>
              })
            }
          </View>
        ) : null
      }
    </ScrollView>
  )
}

export default DetectDetailScreen;