import { useReducer, useRef, useEffect, useCallback } from "react";
import useDebounce from "./useDebounce";

export interface Option {
  label: string;
  value: string;
}

export interface State {
  searchTerm: string;
  filteredOptions: Option[];
  selectedOptions: Option[];
  dropdownPosition: { top: number; left: number; width: number };
  isDropdownOpen: boolean;
  isSearchFieldVisible: boolean;
  highlightedIndex: number | null;
}

type Action =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_FILTERED_OPTIONS"; payload: Option[] }
  | { type: "SET_SELECTED_OPTIONS"; payload: Option[] }
  | {
      type: "SET_DROPDOWN_POSITION";
      payload: { top: number; left: number; width: number };
    }
  | { type: "SET_IS_DROPDOWN_OPEN"; payload: boolean }
  | { type: "SET_IS_SEARCH_FIELD_VISIBLE"; payload: boolean }
  | { type: "SET_HIGHLIGHTED_INDEX"; payload: number | null }
  | { type: "RESET_FILTERED_OPTIONS"; payload: Option[] };

const initialState: State = {
  searchTerm: "",
  filteredOptions: [],
  selectedOptions: [],
  dropdownPosition: { top: 0, left: 0, width: 0 },
  isDropdownOpen: false,
  isSearchFieldVisible: false,
  highlightedIndex: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_FILTERED_OPTIONS":
      return { ...state, filteredOptions: action.payload };
    case "SET_SELECTED_OPTIONS":
      return { ...state, selectedOptions: action.payload };
    case "SET_DROPDOWN_POSITION":
      return { ...state, dropdownPosition: action.payload };
    case "SET_IS_DROPDOWN_OPEN":
      return { ...state, isDropdownOpen: action.payload };
    case "SET_IS_SEARCH_FIELD_VISIBLE":
      return { ...state, isSearchFieldVisible: action.payload };
    case "SET_HIGHLIGHTED_INDEX":
      return { ...state, highlightedIndex: action.payload };
    case "RESET_FILTERED_OPTIONS":
      return {
        ...state,
        filteredOptions: action.payload,
        highlightedIndex: action.payload.length > 0 ? 0 : null,
      };
    default:
      return state;
  }
};

const useSearchableDropdown = (
  options: Option[],
  multiple: boolean,
  searchable: boolean,
  onSelectionChange?: (selected: string[]) => void
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debouncedSearchTerm = useDebounce(state.searchTerm, 300);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_SEARCH_TERM", payload: event.target.value });
    },
    []
  );

  const handleOptionClick = useCallback(
    (option: Option) => {
      const newSelectedOptions = multiple
        ? state.selectedOptions.some(
            (selected) => selected.value === option.value
          )
          ? state.selectedOptions.filter(
              (selectedOption) => selectedOption.value !== option.value
            )
          : [...state.selectedOptions, option]
        : [option];

      dispatch({ type: "SET_SELECTED_OPTIONS", payload: newSelectedOptions });
      onSelectionChange?.(newSelectedOptions.map((option) => option.value));
      dispatch({ type: "SET_IS_DROPDOWN_OPEN", payload: false });
      dispatch({ type: "SET_IS_SEARCH_FIELD_VISIBLE", payload: false });
      dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    },
    [multiple, onSelectionChange, state.selectedOptions]
  );

  const handleRemoveOption = useCallback(
    (option: Option) => {
      const newSelectedOptions = state.selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value
      );
      dispatch({ type: "SET_SELECTED_OPTIONS", payload: newSelectedOptions });
      onSelectionChange?.(newSelectedOptions.map((option) => option.value));
    },
    [onSelectionChange, state.selectedOptions]
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      inputContainerRef.current &&
      !inputContainerRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      dispatch({ type: "SET_IS_DROPDOWN_OPEN", payload: false });
      dispatch({ type: "SET_IS_SEARCH_FIELD_VISIBLE", payload: false });
      dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!state.isDropdownOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          dispatch({
            type: "SET_HIGHLIGHTED_INDEX",
            payload:
              state.highlightedIndex === null
                ? 0
                : Math.min(
                    state.highlightedIndex + 1,
                    state.filteredOptions.length - 1
                  ),
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          dispatch({
            type: "SET_HIGHLIGHTED_INDEX",
            payload:
              state.highlightedIndex === null
                ? state.filteredOptions.length - 1
                : Math.max(state.highlightedIndex - 1, 0),
          });
          break;
        case "Enter":
          event.preventDefault();
          if (state.highlightedIndex !== null) {
            handleOptionClick(state.filteredOptions[state.highlightedIndex]);
          }
          break;
        case "Escape":
          dispatch({ type: "SET_IS_DROPDOWN_OPEN", payload: false });
          dispatch({ type: "SET_IS_SEARCH_FIELD_VISIBLE", payload: false });
          dispatch({ type: "SET_SEARCH_TERM", payload: "" });
          break;
      }
    },
    [
      handleOptionClick,
      state.filteredOptions,
      state.highlightedIndex,
      state.isDropdownOpen,
    ]
  );

  const resetFilteredOptions = useCallback(() => {
    const newFilteredOptions = options.filter(
      (option) =>
        !state.selectedOptions.some(
          (selected) => selected.value === option.value
        )
    );
    dispatch({ type: "RESET_FILTERED_OPTIONS", payload: newFilteredOptions });
  }, [options, state.selectedOptions]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    resetFilteredOptions();
  }, [options, state.selectedOptions, resetFilteredOptions]);

  useEffect(() => {
    if (state.isSearchFieldVisible || !searchable) {
      resetFilteredOptions();
    }
  }, [
    state.isSearchFieldVisible,
    searchable,
    options,
    state.selectedOptions,
    resetFilteredOptions,
  ]);

  useEffect(() => {
    const newFilteredOptions = options.filter(
      (option) =>
        option.label
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) &&
        !state.selectedOptions.some(
          (selected) => selected.value === option.value
        )
    );
    dispatch({ type: "SET_FILTERED_OPTIONS", payload: newFilteredOptions });
    dispatch({
      type: "SET_HIGHLIGHTED_INDEX",
      payload: newFilteredOptions.length > 0 ? 0 : null,
    });
  }, [debouncedSearchTerm, options, state.selectedOptions]);

  useEffect(() => {
    if (
      state.highlightedIndex !== null &&
      optionRefs.current[state.highlightedIndex]
    ) {
      optionRefs.current[state.highlightedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [state.highlightedIndex]);

  return {
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
  };
};

export default useSearchableDropdown;
