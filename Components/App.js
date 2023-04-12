import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Pressable, Box, Button, HStack, VStack, Center } from "native-base";
import useGetAxios from '../hooks/axios';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import ScrollableTiles from '../Components/ScrollableTiles';
import { NavigationContainer } from '@react-navigation/native';

const config = {
  dependencies: {
    // from these docs:  https://docs.nativebase.io/setup-provider
    "linear-gradient": LinearGradient,
  },
};


export default function App() {
  const { results, next, previous, getPage } = useGetAxios('https://swapi.dev/api/people');
  // console.log(results);

  const renderItem = (item) => (
    <Pressable key={item.url} w="40%" onPress={() => Haptics.selectionAsync()}>
      <Center
        m="2"
        bg={'primary.100'}
        p="2"
        rounded="xl"
      >
        {results.name}
      </Center>

    </Pressable>
  )

  return (
    <NavigationContainer>
      <NativeBaseProvider config={config}>
        <Box
          safeArea
          bg={{
            linearGradient: {
              colors: ['lightBlue.300', 'violet.800'],
              start: [0, 0],
              end: [1, 0]
            }
          }}
        >
          <Box
            bg={'primary.800'}
            p="5"
            rounded="xl"
            _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'warmGray.50',
              textAlign: 'center'
            }}
          >
            Star Wars Characters
          </Box>
          <VStack mt="3" space={3} alignItems="center">

            <ScrollableTiles
              data={results}
              renderItem={renderItem}
            />
          </VStack>
          {
            previous &&
            <Button
              onPress={() => getPage(previous)}
              colorScheme="secondary"
            >
              Previous
            </Button>
          }
          <Button
            onPress={() => getPage(next)}
          >
            Next
          </Button>


        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});