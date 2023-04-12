import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { App as Swapi } from './Components/App';
import { NavigationContainer } from '@react-navigation/native';

const screen = Dimensions.get('window');

const formatNum = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNum(mins), secs: formatNum(secs) };

}

export default function App({ navigation }) {
  const [remSecs, setRemSecs] = useState(0);
  const [active, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remSecs);

  toggle = () => {
    setIsActive(!active);
  }

  const reset = () => {
    setRemSecs(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setRemSecs(remSecs => remSecs + 1);
      }, 1000)
    } else if (!active && remSecs !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [active, remSecs]);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="light-content" />
        <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
        <TouchableOpacity onPress={(this.toggle)} style={styles.button}>
          <Text style={styles.buttonText}>{active ? 'PAUSE' : 'START'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
          <Text style={[styles.buttonText, styles.buttonTextReset]}>RESET</Text>
        </TouchableOpacity>
        {/* THIS IS BROKEN */}
        <TouchableOpacity onPress={() => navigation.navigate("Swapi")} style={[styles.button, styles.swapiButton]}>
          <Text style={[styles.buttonText, styles.swapiButtonText]}>SWAPI</Text>
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: '#B9AAFF',
    width: screen.width / 2,
    height: screen.width / 4,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 40,
    color: '#B9AAFF',
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
    marginBottom: 20
  },
  buttonReset: {
    marginTop: 20,
    borderColor: '#FF851B'
  },
  buttonTextReset: {
    color: '#FF851B'
  },
  swapiButton: {
    marginTop: 20,
    borderColor: '#13fc03',

  },
  swapiButtonText: {
    fontSize: 40,
    color: '#13fc03',

  }
});
