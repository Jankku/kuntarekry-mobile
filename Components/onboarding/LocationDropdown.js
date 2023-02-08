import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { useJobLocations } from '../../hooks/usejoblocations';

export default function MunicipalityDropdown({ onChange }) {
  const { t } = useTranslation(['translations', 'common']);
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
        PLACEHOLDER: t('personalisation.location.placeholder'),
        SEARCH_PLACEHOLDER: t('personalisation.location.searchPlaceholder'),
        NOTHING_TO_SHOW: t('noResults', { ns: 'common' }),
      }}
    />
  );
}
