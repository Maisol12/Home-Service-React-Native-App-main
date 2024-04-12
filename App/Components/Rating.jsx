import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Rating({rating}) {
  const [starRating, setStarRating] = useState(rating);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.stars}>
          <View>
            <MaterialIcons
              name={starRating >= 1 ? 'star' : 'star-border'}
              size={20}
              style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
            />
          </View>
          <View>
            <MaterialIcons
              name={starRating >= 2 ? 'star' : 'star-border'}
              size={20}
              style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
            />
          </View>
          <View>
            <MaterialIcons
              name={starRating >= 3 ? 'star' : 'star-border'}
              size={20}
              style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
            />
          </View>
          <View>
            <MaterialIcons
              name={starRating >= 4 ? 'star' : 'star-border'}
              size={20}
              style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
            />
          </View>
          <View>
            <MaterialIcons
              name={starRating >= 5 ? 'star' : 'star-border'}
              size={20}
              style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'start',
    justifyContent: 'center',
    padding: 0,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
});