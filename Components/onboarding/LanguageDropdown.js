import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';

const languages = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
  { label: 'English', value: 'en' },
];

export default function LanguageDropdown({ onChange }) {
  const { t } = useTranslation();
  const [items, setItems] = useState(languages);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
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
        PLACEHOLDER: t('personalisation.language.placeholder'),
      }}
    />
  );
}
