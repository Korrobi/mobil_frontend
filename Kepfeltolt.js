import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TextInput, StyleSheet,form } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Ipcim from './Ipcim';

export default function Kepfeltolt() {
  const [bevitel1, setBevitel1] = useState('');
  const [bevitel2, setBevitel2] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedAlfaj, setSelectedAlfaj] = useState();
  const [alfajok, setAlfajok] = useState([]);
  
  const SERVER_URL = Ipcim.Ipcim;

const getMovies = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/lenyilolista`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const pickImageAndUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        const formData = new FormData();
        formData.append('photo', {
          uri: result.uri,
          type: 'image/jpg',
          name: 'photo.jpg',
        });
        formData.append('bevitel1', bevitel1);
        formData.append('bevitel2', bevitel2);
        formData.append('selectedLanguage', selectedLanguage);
        formData.append('selectedAlfaj', selectedAlfaj);

        fetch(`${SERVER_URL}/api/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => response.json())
          .then(jsonData => {
            console.log('Upload Response', jsonData);
            if (!jsonData.success) {
              throw new Error(jsonData.message || 'Unknown error');
            }
          })
          .catch(error => {
            console.error('Upload Error', error.message);
          });
      } else {
        console.log('No image selected to upload.');
      }
    } catch (error) {
      console.error('Error picking/uploading image:', error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{textAlign:"left", padding: 10 }}>
        Név:
      </Text>
      <TextInput
        style={{ height: 40,width:200, margin: 5, backgroundColor: 'cyan' }}
        placeholder="Név"
        onChangeText={newText => setBevitel1(newText)}
        defaultValue={bevitel1}
      />

      

      <Text style={{textAlign:"left", padding: 10 }}>
        Leírás:
      </Text>
      <TextInput
        style={{ height: 50,width:200, margin: 5, backgroundColor: 'grey' }}
        placeholder="Leírás"
        onChangeText={newText => setBevitel2(newText)}
        defaultValue={bevitel2}
      />
<Text style={{textAlign:"left", padding: 10 }}>
        Faj:
      </Text>
      <Picker
  style={styles.container}
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) => {
    setSelectedLanguage(itemValue);
    // Call the new route to fetch alfajok based on the selected faj
    fetch(`${SERVER_URL}/lenyilolistaalfaj/${itemValue}`)
      .then(response => response.json())
      .then(json => {
        // Update the alfajok list based on the selected faj
        setAlfajok(json);
      })
      .catch(error => {
        console.error('Error fetching alfajok:', error);
      });
  }}
>
  <Picker.Item label="Válassz egy fajtát..." value={null} />
  {data.map((item) => (
    <Picker.Item
      key={item.fajok_id.toString()}
      label={item.fajok_nev}
      value={item.fajok_id}
    />
  ))}
</Picker>

<Text style={{ textAlign: "left", padding: 10 }}>
  Alfaj:
</Text>
<Picker
  style={styles.container}
  selectedValue={selectedAlfaj}
  onValueChange={(itemValue, itemIndex) => setSelectedAlfaj(itemValue)}
>
  <Picker.Item label="Válassz egy Alfajtát..." value={null} />
  {alfajok.map((item) => (
    <Picker.Item
      key={item.alfajok_id.toString()}
      label={item.alfajok_nev}
      value={item.alfajok_id}
    />
  ))}
</Picker>
      <Button title="Pick and Upload Image" onPress={pickImageAndUpload} />
    </View>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    height:20,
    width:200,
    borderWidth: 1,
    borderColor: 'red',
  },
});