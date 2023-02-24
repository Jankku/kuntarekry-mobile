import { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import { updateStoredList, useFavoriteList } from '../../hooks/usefavoritelist';
import { colors } from '../../styles/colors';

export default function SwipeableRow({ children, job }) {
  const navigation = useNavigation();
  const { updateFavorites } = useFavoriteList();

  const swipeableRowRef = useRef(null);

  const renderLeftActions = (progress) => {
    const translateX = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-50, -25, 0],
    });
    const scale = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1.5],
    });
    return (
      <View style={styles.actionContainer}>
        <View style={styles.leftAction}>
          <Animated.Text style={{ transform: [{ translateX: translateX }, { scale: scale }] }}>
            <Icon color="white" name="heart" size={24} />
          </Animated.Text>
        </View>
      </View>
    );
  };

  const renderRightActions = (progress) => {
    const translateX = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-50, 0, 0],
    });
    const scale = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1.5],
    });
    return (
      <View style={styles.actionContainer}>
        <View style={styles.rightAction}>
          <Animated.Text style={{ transform: [{ translateX: translateX }, { scale: scale }] }}>
            <Icon color="white" name="chevron-right" size={40} />
          </Animated.Text>
        </View>
      </View>
    );
  };

  const swipedOpen = async (direction) => {
    if (direction === 'right') {
      navigation.navigate('Job', { job });
    } else if (direction === 'left') {
      await updateStoredList('job', job);
      updateFavorites();
    }
    swipeableRowRef.current.close();
  };
  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      overshootLeft={false}
      overshootRight={false}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableOpen={swipedOpen}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    width: 85,
  },
  leftAction: {
    alignItems: 'center',
    backgroundColor: colors.detailGreen,
    flex: 1,
    justifyContent: 'center',
  },
  rightAction: {
    alignItems: 'center',
    backgroundColor: colors.detail,
    flex: 1,
    justifyContent: 'center',
  },
});
