import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useJobLocations } from '../../hooks/usejoblocations';

export default function MunicipalityDropdown({ onChange }) {
  const { locations } = useJobLocations();
  const [items, setItems] = useState(locations);
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
      onSelectItem={(item) => onChange(item.id)}
      zIndex={2000}
      zIndexInverse={2000}
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
        PLACEHOLDER: 'Valitse paikkakunta',
        SEARCH_PLACEHOLDER: 'Hae paikkakuntia',
        NOTHING_TO_SHOW: 'Ei löytynyt mitään',
      }}
    />
  );
}
