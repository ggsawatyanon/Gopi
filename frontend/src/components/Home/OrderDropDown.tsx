import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { colors } from '../../colors.js';

const useStyles = makeStyles({
  dropDown: {
    position: 'relative',
    display: 'inline-block',
  },
  dropDownButton: {
    backgroundColor: colors.green1,
    border: 'none',
    paddingBlock: '0.5em',
    paddingLeft: '1em',
    paddingRight: '1em',
    cursor: 'pointer',
    outline: 'none',
    borderRadius: 15,
    fontFamily: 'Raleway-medium',
    fontSize: 17,
    color: 'white',
    width: '9.3em',
    textAlign: 'center',
  },
  dropDownContent: {
    position: 'absolute',
    backgroundColor: 'white',
    minWidth: '9.85em',
    boxShadow: '0px 2px 6px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    display: 'block',
    textAlign: 'center',
  },
  dropDownItem: {
    padding: '10px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.gray1,
    },
  },
  sortByText: {
    fontFamily: 'Raleway-medium',
    fontSize: 17,
    color: colors.gray3,
    position: 'relative',
    display: 'inline-block',
    paddingRight: '0.4em',
  }
});

//Define types for sortBy and onSortSelect
interface OrderDropDownProps {
  sortBy: string;
  onSortSelect: (option: string) => void;
}

const OrderDropDown = ({ sortBy, onSortSelect }: OrderDropDownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {dropDown, dropDownButton, dropDownContent, dropDownItem, sortByText} = useStyles();
  const dropdownRef = useRef<HTMLDivElement>(null); 
  
  // OPENS DROPDOWN
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // DROPDOWN SELECTION
  const handleSortSelect = (option: string) => {
    onSortSelect(option);
    setIsDropdownOpen(!isDropdownOpen);
  };

  // CLOSE DROPDOWN WHEN CLICKED OUTSIDE
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  // EVENT LISTENER FOR OUTSIDE CLICK
  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <h1 className={sortByText}>Sort by:</h1>

      {/* DROPDOWN BUTTON */}
      <div className={dropDown} ref={dropdownRef}>
        <button className={dropDownButton} onClick={handleDropdownToggle}>
          {sortBy}
        </button>

        {isDropdownOpen && (
          <div className={dropDownContent}>
            <div className={dropDownItem} onClick={() => handleSortSelect('Last played')}>
              Last played
            </div>
            <div className={dropDownItem} onClick={() => handleSortSelect('Last edited')}>
              Last edited
            </div>
            <div className={dropDownItem} onClick={() => handleSortSelect('Created first')}>
              Created first
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDropDown;
