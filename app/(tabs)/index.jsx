import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MathView from '../../components/MathView';

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Math Renderer</Text>
        
        <View style={styles.card}>
          <Text style={styles.label}>Simple Equation:</Text>
          <MathView 
            math="E = mc^2" 
            style={styles.mathSmall}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Quadratic Formula:</Text>
          <MathView 
            math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" 
            displayMode={true}
            style={styles.mathLarge}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Sum:</Text>
          <MathView 
            math="\sum_{i=1}^{n} i = \frac{n(n+1)}{2}" 
            displayMode={true}
            style={styles.mathLarge}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  mathSmall: {
    height: 60,
  },
  mathLarge: {
    height: 80,
  },
});