import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useJobTasks } from '../../hooks/usejobtasks';

export default function TaskDropdown({ onChange }) {
  const { tasks } = useJobTasks();
  const [items, setItems] = useState(tasks);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      searchable
      categorySelectable
      listMode="MODAL"
      loading={items.length === 0}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={onChange}
      containerProps={{
        maxWidth: '100%',
      }}
      modalProps={{
        animationType: 'slide',
      }}
      itemKey="id"
      schema={{
        label: 'name',
        value: 'id',
      }}
      translation={{
        PLACEHOLDER: 'Valitse tehtäväala',
        SEARCH_PLACEHOLDER: 'Hae tehtäväaloja',
        NOTHING_TO_SHOW: 'Ei löytynyt mitään',
      }}
    />
  );
}
