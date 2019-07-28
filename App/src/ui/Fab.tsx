import * as React from 'react'
import { TouchableOpacity, Text } from 'react-native';

interface Props {
    onPress: () => void;
}

import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    fab: {
        width: 40,
        height: 40,
        backgroundColor: "#80644D",
        position: "absolute",
        bottom: 10,
        right: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24,
        color: "white"
    }
});

export const Fab: React.FC<Props> = ({onPress}) => {
        return (
            <TouchableOpacity style={styles.fab} onPress={onPress}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        );
}