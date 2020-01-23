import React, { useState } from 'react';
import FilterButton from './FilterButton';
import FilterFormContainer from './FilterFormContainer';

const Filter = () => {
  const testStyles = {
    borderLeft: '1px solid grey',
    backgroundColor: 'white'
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [language, setLanguage] = useState('');

  const props = {
    isOpen,
    setIsOpen,
    isFilter,
    setIsFilter,
    title,
    setTitle,
    address,
    setAddress,
    language,
    setLanguage
  };

  return (
    <div style={testStyles}>
      <FilterButton {...props} />
      {isOpen ? <FilterFormContainer {...props} /> : null}
    </div>
  );
};

export default Filter;
