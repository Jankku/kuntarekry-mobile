import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const languages = [
  { label: 'Suomi', value: 'fi_FI' },
  { label: 'Svenska', value: 'sv_SE' },
  { label: 'English', value: 'en_US' },
];

export default function LanguageDropdown({ onChange }) {
  const [items, setItems] = useState(languages);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
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
      zIndex={3000}
      zIndexInverse={1000}
      translation={{
        PLACEHOLDER: 'Valitse kieli',
      }}
    />
  );
}
