import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const getMovies = async () => {
    try {
      const response = await fetch('http://192.168.10.57:3000/lenyilolista');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Kiirat=()=>{
    alert(selectedLanguage);
  
  }
  
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Picker
        style={styles.container}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        {data.map((item) => (
          <Picker.Item
            key={item.fajok_id.toString()} // Added key prop
            label={item.fajok_nev}
            value={item.fajok_id}
          />
        ))}
      </Picker>
      <Button title="nyomj meg" onPress={Kiirat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default App;