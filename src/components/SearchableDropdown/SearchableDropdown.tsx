import React, { useMemo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import useSearchableDropdown, { Option } from "./useSearchableDropdown";
import Dropdown from "./Dropdown";

import "./index.css";

interface SearchableDropdownProps {
  label: string;
  options: Option[];
  usePortal?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  onSelectionChange?: (selected: string[]) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  options,
  usePortal = false,
  multiple = false,
  searchable = true,
  onSelectionChange,
}) => {
  const {
    state,
    inputContainerRef,
    inputRef,
    dropdownRef,
    optionRefs,
    handleSearchChange,
    handleOptionClick,
    handleRemoveOption,
    handleKeyDown,
    dispatch,
  } = useSearchableDropdown(options, multiple, searchable, onSelectionChange);

  const calculateDropdownPosition = useCallback(() => {
    if (inputContainerRef.current) {
      const rect = inputContainerRef.current.getBoundingClientRect();
      dispatch({
        type: "SET_DROPDOWN_POSITION",
        payload: {
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        },
      });
    }
  }, [inputContainerRef, dispatch]);

  useEffect(() => {
    if (state.isDropdownOpen && usePortal) {
      calculateDropdownPosition();
      window.addEventListener("resize", calculateDropdownPosition);
      window.addEventListener("scroll", calculateDropdownPosition);
    }
    return () => {
      window.removeEventListener("resize", calculateDropdownPosition);
      window.removeEventListener("scroll", calculateDropdownPosition);
    };
  }, [state.isDropdownOpen, usePortal, calculateDropdownPosition]);

  const PortalDropdown = useMemo(
    () => (
      <div
        style={{
          position: "absolute",
          top: state.dropdownPosition.top,
          left: state.dropdownPosition.left,
          width: state.dropdownPosition.width,
          zIndex: 1000,
        }}
      >
        <Dropdown
          label={label}
          state={state}
          inputContainerRef={inputContainerRef}
          inputRef={inputRef}
          dropdownRef={dropdownRef}
          optionRefs={optionRefs}
          handleSearchChange={handleSearchChange}
          handleOptionClick={handleOptionClick}
          handleRemoveOption={handleRemoveOption}
          handleKeyDown={handleKeyDown}
          dispatch={dispatch}
          searchable={searchable}
          usePortal={usePortal}
          isPortal={true}
        />
      </div>
    ),
    [
      state.dropdownPosition,
      state.isSearchFieldVisible,
      state.searchTerm,
      searchable,
      handleSearchChange,
      handleKeyDown,
      dispatch,
    ]
  );

  return (
    <>
      <Dropdown
        label={label}
        state={state}
        inputContainerRef={inputContainerRef}
        inputRef={inputRef}
        dropdownRef={dropdownRef}
        optionRefs={optionRefs}
        handleSearchChange={handleSearchChange}
        handleOptionClick={handleOptionClick}
        handleRemoveOption={handleRemoveOption}
        handleKeyDown={handleKeyDown}
        dispatch={dispatch}
        searchable={searchable}
        usePortal={usePortal}
      />
      {state.isDropdownOpen &&
        usePortal &&
        createPortal(PortalDropdown, document.body)}
    </>
  );
};

export default SearchableDropdown;
