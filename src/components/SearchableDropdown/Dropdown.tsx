import React, { useMemo } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { PiCaretDownBold } from "react-icons/pi";
import { Option, State } from "./useSearchableDropdown";

interface DropdownProps {
  label: string;
  state: State;
  inputContainerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  dropdownRef: React.RefObject<HTMLUListElement>;
  optionRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOptionClick: (option: Option) => void;
  handleRemoveOption: (option: Option) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  dispatch: React.Dispatch<any>;
  searchable: boolean;
  usePortal: boolean;
  isPortal?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
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
  searchable,
  usePortal,
  isPortal = false,
}) => {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-teal-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const DropdownList = useMemo(
    () => (
      <ul
        ref={dropdownRef}
        className="border border-gray-300 max-h-40 overflow-y-auto bg-white custom-scrollbar shadow-lg"
        role="listbox"
      >
        {state.filteredOptions.length > 0 ? (
          state.filteredOptions.map((option: Option, index: number) => (
            <li
              key={index}
              ref={(el) => (optionRefs.current[index] = el)}
              className={`px-4 py-2 hover:bg-slate-200 cursor-pointer ${
                state.selectedOptions.some(
                  (selected: Option) => selected.value === option.value
                )
                  ? "bg-slate-300"
                  : ""
              } ${state.highlightedIndex === index ? "bg-slate-300" : ""}`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={state.highlightedIndex === index}
            >
              {highlightText(option.label, state.searchTerm)}
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-gray-500">
            No options match your search
          </li>
        )}
      </ul>
    ),
    [
      state.filteredOptions,
      state.selectedOptions,
      state.highlightedIndex,
      state.searchTerm,
      handleOptionClick,
      highlightText,
    ]
  );

  const DropdownComponent = (
    <div
      className={`flex flex-col ${
        isPortal ? "" : "md:flex-row"
      } items-start space-x-0 ${isPortal ? "" : "md:space-x-4"} py-3`}
    >
      {!isPortal && (
        <label className="w-full md:w-2/12 text-left md:pt-3 font-semibold">
          {label}
        </label>
      )}
      <div
        className={`w-full ${isPortal ? "" : "mt-2 md:w-10/12 md:mt-0"} relative`}
      >
        {!isPortal && (
          <div
            onClick={() => {
              dispatch({ type: "SET_IS_DROPDOWN_OPEN", payload: true });
              if (searchable) {
                dispatch({
                  type: "SET_IS_SEARCH_FIELD_VISIBLE",
                  payload: true,
                });
                dispatch({ type: "SET_HIGHLIGHTED_INDEX", payload: 0 });
                setTimeout(() => {
                  inputRef.current?.focus();
                  optionRefs.current[0]?.scrollIntoView({ block: "nearest" });
                }, 0);
              }
            }}
            className="w-full px-4 pt-2 border border-gray-300 rounded-md cursor-pointer flex flex-wrap items-center min-h-[2.5rem] relative"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            ref={inputContainerRef}
            role="combobox"
            aria-expanded={state.isDropdownOpen}
            aria-haspopup="listbox"
          >
            {state.selectedOptions.length > 0 ? (
              state.selectedOptions.map((option: Option, index: number) => (
                <span
                  key={index}
                  className="flex items-center px-3 py-1 mr-2 mb-2 bg-gray-200 text-gray-800 rounded-full"
                >
                  {option.label}
                  <button
                    type="button"
                    className="ml-2 w-4 h-4 border border-gray-500 text-gray-500 rounded-full flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(option);
                    }}
                    aria-label={`Remove ${option.label}`}
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))
            ) : (
              <span className="invisible">Placeholder</span> // Invisible placeholder to maintain size
            )}
            <PiCaretDownBold className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />{" "}
            {/* Caret down icon */}
          </div>
        )}
        {state.isSearchFieldVisible && searchable && !usePortal && (
          <div className="relative mt-2">
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onMouseDown={(e) => e.stopPropagation()}
            />
            <input
              ref={inputRef}
              type="text"
              value={state.searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-0 border-b-0"
              placeholder="Search..."
              onKeyDown={handleKeyDown}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Search"
            />
            {state.searchTerm && (
              <IoMdCloseCircle
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  dispatch({ type: "SET_SEARCH_TERM", payload: "" });
                }}
                aria-label="Clear search"
              />
            )}
          </div>
        )}
        {state.isDropdownOpen && !usePortal && DropdownList}
        {isPortal && (
          <>
            {state.isSearchFieldVisible && searchable && (
              <div className="relative mt-2">
                <FaSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onMouseDown={(e) => e.stopPropagation()}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={state.searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-0 border-b-0"
                  placeholder="Search..."
                  onKeyDown={handleKeyDown}
                  onMouseDown={(e) => e.stopPropagation()}
                  aria-label="Search"
                />
                {state.searchTerm && (
                  <IoMdCloseCircle
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      dispatch({ type: "SET_SEARCH_TERM", payload: "" });
                    }}
                    aria-label="Clear search"
                  />
                )}
              </div>
            )}
            {DropdownList}
          </>
        )}
      </div>
    </div>
  );

  return DropdownComponent;
};

export default Dropdown;
