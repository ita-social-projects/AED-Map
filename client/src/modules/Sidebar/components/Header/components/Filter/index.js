import React, { useState } from 'react';
import FilterButton from './FilterButton';
import FilterFormik from './FilterFormik';

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <FilterButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <FilterFormik setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Filter;
