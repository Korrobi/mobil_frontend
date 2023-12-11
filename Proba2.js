import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, } from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAnimals = async () => {
    try {
      const response = await fetch('http://192.168.10.57:3000/allatok');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Hiba a lekérdezés során: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ allatok_id }) => allatok_id.toString()}
          renderItem={({ item }) => (
            <View>
                
              <Text>{item.allatok_nev}| {item.fajok_nev}| {item.alfajok_nev}</Text>
              {item.allatok_kep && (
                <Image
                  style={{ width: 300, height: 300 }}
                  source={{ uri: `http://192.168.10.57:3000/images/${item.allatok_kep}` }}
                />
              )}
              <View style={{borderWidth:1}}/>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;