import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function Loading() {
    return(
        <View style={styles.activityContainer}> 
            <ActivityIndicator style={styles.activity} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    activityContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
        backgroundColor: 'black',
    },
  });