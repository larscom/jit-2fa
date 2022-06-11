import AutoTransition from '$core/components/AutoTransition';
import { useImportState } from '$import/contexts/import';
import { ImportStrategy } from '$import/models/import-strategy';
import { Group, InputWrapper, SegmentedControl } from '@mantine/core';

const getDescription = (strategy: ImportStrategy): string => {
  switch (strategy) {
    case 'replace': {
      return 'Imported accounts will replace all existing accounts';
    }
    case 'merge': {
      return 'Merge imported accounts with existing accounts, overwrite existing';
    }
    case 'merge_keep': {
      return 'Merge imported accounts with existing accounts, keep existing';
    }
    default: {
      throw Error(`${strategy} is not handled`);
    }
  }
};

function ImportStrategyInput() {
  const { importStrategy, setImportStrategy } = useImportState();

  const data = [
    { label: 'Replace', value: 'replace' },
    { label: 'Merge', value: 'merge' },
    { label: 'Merge Keep', value: 'merge_keep' }
  ];

  const handleOnChange = (value: ImportStrategy) => setImportStrategy(value);

  return (
    <AutoTransition
      target={
        <Group position="center">
          <InputWrapper label="Strategy" description={getDescription(importStrategy)}>
            <SegmentedControl color="pink" value={importStrategy} onChange={handleOnChange} data={data} />
          </InputWrapper>
        </Group>
      }
    />
  );
}

export default ImportStrategyInput;
