import * as React from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';
import { RouteComponentProps } from 'react-router';
import { HistoryCard } from '../ui/HistoryCard';

interface Props extends RouteComponentProps { };

import {StyleSheet} from 'react-native'
import { CurrentExercise } from '../stores/WorkoutStore';
import { Fab } from '../ui/Fab';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    cardContainer:{
        flex: 1,
        padding: 10,
    },
    container: {
        flex: 1
    }
});

export const WorkoutHistory: React.FC<Props> = observer(({history}) => {
    const rootStore = React.useContext(RootStoreContext);

    const rows: Array<
        Array<{
            date: string;
            exercises: CurrentExercise[];
        }>
    > = [];

    Object.entries(rootStore.workoutStore.history).forEach(([date, exercises], i) => {
        // const hc = (

        // );
        if (i % 2 === 0) {
            rows.push([{
                date,
                exercises
            }]);
        } else {
            rows[rows.length - 1].push({
                date, 
                exercises
            });
        }
    });

    return (
        <View style={styles.container}>
            <FlatList
            renderItem={({item}) => (
                <View style={styles.row}>
                    {item.map(({ date, exercises }) => (
                        <View key={date} style={styles.cardContainer}>
                            
                            <HistoryCard onPress={() => {
                                const parts = date.split("-");
                                history.push(`/workout/${parts[0]}/${parts[1]}/${parts[2]}`);}
                            } header={date} currentExercises={exercises} />
                        </View>
                    ))}
                    {item.length < 2 ? <View style={styles.cardContainer} /> : null}
                </View>
            )} 
                data={rows} 
                keyExtractor={(item) => item.reduce((pv, cv) => pv + " " + cv.date, "")}
            />
            <Fab onPress={() => {
                if (!rootStore.workoutStore.hasCurrentWorkout) {

                    const {
                        currentBarbellRow, 
                        currentBenchPress, 
                        currentDeadlift, 
                        currentOverheadPress, 
                        currentSquat
                    } = rootStore.workoutStore;
                    const emptySets = ["", "", "", "", ""];
                    if (rootStore.workoutStore.lastWorkoutType === 'b') {
                        rootStore.workoutStore.currentExercise.push(
                            {
                                exercise: 'Squat',
                                numSets: 5,
                                reps: 5,
                                sets: [...emptySets],
                                weight: currentSquat,
                            },
                            {
                                exercise: 'Bench Press',
                                numSets: 5,
                                reps: 5,
                                sets: [...emptySets],
                                weight: currentBenchPress,
                            },
                            {
                                exercise: 'Deadlift',
                                numSets: 1,
                                reps: 5,
                                sets: ["", "x", "x", "x", "x"],
                                weight: currentDeadlift,
                            },
                        );
                        rootStore.workoutStore.currentSquat += 5;
                        rootStore.workoutStore.currentBenchPress += 5;
                        rootStore.workoutStore.currentDeadlift += 5;

                    } else {
                        rootStore.workoutStore.currentExercise.push(
                            {
                                exercise: 'Squat',
                                numSets: 5,
                                reps: 5,
                                sets: [...emptySets],
                                weight: currentSquat,
                            },
                            {
                                exercise: 'Overhead Press',
                                numSets: 5,
                                reps: 5,
                                sets: [...emptySets],
                                weight: currentOverheadPress,
                            },
                            {
                                exercise: 'Barbell Row',
                                numSets: 5,
                                reps: 5,
                                sets: [...emptySets],
                                weight: currentBarbellRow,
                            },
                        );
                        rootStore.workoutStore.currentSquat += 5;
                        rootStore.workoutStore.currentOverheadPress += 5;
                        rootStore.workoutStore.currentBarbellRow += 5;
                    }
    
                    rootStore.workoutStore.lastWorkoutType = 
                        rootStore.workoutStore.lastWorkoutType === 'a' ? 'b' : 'a';
                }
                
                history.push("/current-workout");
            }} />
        </View>
    );
});