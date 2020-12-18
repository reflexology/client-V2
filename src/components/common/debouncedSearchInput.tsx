import React, { useImperativeHandle, useState } from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input/Search';

import Dictionary from 'dictionary/dictionary';
import useDebounce from 'hooks/useDebounce';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';

interface DebouncedSearchInputProps extends SearchProps {
  onDebounced: (searchQuery: string) => void;
  delay: number;
}

export interface DebouncedSearchInputRef {
  reset: () => void;
}

const DebouncedSearchInput = React.forwardRef<DebouncedSearchInputRef, DebouncedSearchInputProps>((props, ref) => {
  const { onDebounced, delay, ...searchProps } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, delay);

  useDidUpdateEffect(() => onDebounced(debouncedSearchQuery), [debouncedSearchQuery]);

  useImperativeHandle(ref, () => ({
    reset: () => setSearchQuery('')
  }));

  return (
    <Input.Search
      allowClear
      data-testid='search'
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder={Dictionary.search}
      {...searchProps}
    />
  );
});

export default DebouncedSearchInput;
