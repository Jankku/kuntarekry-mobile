import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { useJobTasks } from '../../hooks/usejobtasks';

export default function TaskDropdown({ onChange }) {
  const { t } = useTranslation(['translations', 'common']);
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
        PLACEHOLDER: t('personalisation.taskArea.placeholder'),
        SEARCH_PLACEHOLDER: t('personalisation.taskArea.searchPlaceholder'),
        NOTHING_TO_SHOW: t('noResults', { ns: 'common' }),
      }}
    />
  );
}
