import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input/Search';

import Dictionary from 'dictionary/dictionary';
import useDebounce from 'hooks/useDebounce';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';

interface DebouncedSearchInputProps extends SearchProps {
  onDebounced: (searchQuery: string) => void;
  delay: number;
}

const DebouncedSearchInput: React.FC<DebouncedSearchInputProps> = ({ onDebounced, delay, ...searchProps }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, delay);

  useDidUpdateEffect(() => onDebounced(debouncedSearchQuery), [debouncedSearchQuery]);

  return (
    <Input.Search
      allowClear
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder={Dictionary.search}
      {...searchProps}
    />
  );
};

export default DebouncedSearchInput;
