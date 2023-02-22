import { useJobLocations } from '../hooks/usejoblocations';
import { useJobTasks } from '../hooks/usejobtasks';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCATION_KEY, TASK_KEY } from '../hooks/usepersonalisation';

export default function PersonalizationChips() {
  const { tasks } = useJobTasks();
  const { locations } = useJobLocations();
  const [location, setLocation] = useState(null);
  const [locationNumber, setLocationNumber] = useState(null);
  const [task, setTask] = useState(null);
  const [taskNumber, setTaskNumber] = useState(null);

  useEffect(() => {
    (async () => {
      const location1 = await AsyncStorage.getItem(LOCATION_KEY);
      const taskArea1 = await AsyncStorage.getItem(TASK_KEY);
      setLocationNumber(location1);
      setTaskNumber(taskArea1);
    })();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && tasks.length > 0) {
      findLocationAndTaskName(locationNumber, taskNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, tasks, locationNumber, taskNumber]);

  const findLocationAndTaskName = (location, task) => {
    if (location !== null) {
      const foundLocation = locations.find((l) => l.id === parseInt(location));
      if (foundLocation !== undefined) {
        const locationName = foundLocation.name;
        if (locationName) {
          setLocation(locationName);
        }
      }
    }
    if (task !== null) {
      const foundTask = tasks.find((t) => t.id === parseInt(task));
      if (foundTask !== undefined) {
        const taskName = foundTask.name;
        if (taskName) {
          setTask(taskName);
        }
      }
    }
  };

  const personalizationChips = [];

  if (location) {
    personalizationChips.push({
      label: location,
      query: location,
      filter: 'location',
    });
  }
  if (task) {
    personalizationChips.push({
      label: task,
      query: task,
      filter: 'taskArea',
    });
  }
  if (location && task) {
    personalizationChips.push({
      label: `${location} & ${task}`,
      query: location,
      query2: task,
      filter: 'location',
      filter2: 'taskArea',
    });
  }

  return { personalizationChips };
}
