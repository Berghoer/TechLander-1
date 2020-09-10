import React, { useState } from 'react';
// import JobListing from '../components/JobListing';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  GestureResponderEvent,
  SafeAreaView,
} from 'react-native';
import { Icon, Row } from 'native-base';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import uuidv4 from 'uuid/v4';

type SearchContainerProps = {
  history: [];
  onPress: (event: GestureResponderEvent) => void;
};

type state = {
  tech: [];
  currentTech: string;
  location: string;
  addQuery: string;
  subtractQuery: string;
  queriedListings: [{}];
};

const SearchContainer = (props: SearchContainerProps) => {
  const { history } = props;

  const [currentTech, updateCurrentTech] = useState('');
  const [tech, addTech] = useState([]);
  const [location, setLocation] = useState('');
  const [addQuery, setAddQuery] = useState('');
  const [subtractQuery, setSubtractQuery] = useState('');
  
  // queried listings is returned as as result array
  const [queriedListings, setQueriedJobListings] = useState([]);

  const handleTechChange = (text: any) => {
    updateCurrentTech(text);
  };

  const handleLocationInput = (text: any) => {
    setLocation(text);
  };
  const handleLocationSubmit = () => {
    console.log(location);
    // send location as query
  };

  const handleTechStack = () => {
    if (currentTech.length > 0) {
      let initial: any = [...tech, currentTech];
      addTech(initial);
      updateCurrentTech('');
    }
    // add the most recent item into search query
    let newTechStack = tech.concat(currentTech);
    const addQueryString = newTechStack.join(' ');
    // optional set state
    setAddQuery(addQueryString);
    // send query
  };

  const handleDeleteTech = (e: any) => {
    // console.log(e);
    const idx = tech.indexOf(e);
    if (idx > -1) {
      tech.splice(idx, 1);
    }
    console.log(tech);
    handleTechStack();
    const subtractQueryString = tech.join(' ');
    // optional set state
    setSubtractQuery(subtractQueryString);
    // send query
  };

  return (
    <View style={styled.container}>
      <SafeAreaView>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter Your Location"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            value={location}
            onChangeText={handleLocationInput}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleLocationSubmit}>
            <Icon name="add" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter a Tech Stack"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            value={currentTech}
            onChangeText={handleTechChange}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleTechStack}>
            <Icon name="add" />
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {tech.map((techItem) => (
            <View style={styles.techListItem} key={uuidv4()}>
              <Text style={{ color: 'white' }} onPress={() => handleDeleteTech(techItem)}>
                {techItem} x
              </Text>
            </View>
          ))}
        </View>
        <Text>Search Results</Text>
        <View style={styles.resultsContainer}>
          {/* still need to add props to component */}
        {queriedListings.map((jobListing) => (<JobListing />))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flexDirection: 'row',
    margin: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    alignSelf: 'center',
  },
  input: {
    margin: 10,
    height: 25,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: 300,
    textAlign: 'center',
    color: 'black',
  },
  locationButton: {
    backgroundColor: '#7a42f4',
    margin: 15,
    height: 25,
    marginBottom: 5,
    width: 100,
    marginLeft: 15,
  },
  locationText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 3,
  },
  addText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 15,
  },
  addButton: {
    marginTop: 5,
    marginLeft: 0,
    justifyContent: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 0,
    marginRight: 30,
    marginLeft: 30,
  },
  resultsContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    marginBottom: 10,
  },
  techListItem: {
    backgroundColor: '#7a42f4',
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    flexDirection: 'row',
  },
  deleteTechItem: {
    marginRight: 5,
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
  },
});

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7fffd4',
  },
});
