# Custom Dropdown

This project demonstrates various configurations of a `SearchableDropdown` component using React, TypeScript, and Tailwind CSS. `SearchableDropdown` is a custom dropdown component that I created for a project. It is a simple dropdown that can be used in any project. It is fully customizable and can be used in any project.

## Table of Contents

- [Custom Dropdown](#custom-dropdown)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Components](#components)
    - [SearchableDropdown](#searchabledropdown)
      - [Props](#props)
      - [Example](#example)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fruit-selection-dropdowns.git
   cd fruit-selection-dropdowns
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
    yarn start
   ```

## Usage

1. Import the `SearchableDropdown` component:

   ```tsx
   import { SearchableDropdown } from "./components/SearchableDropdown";
   ```

2. Use the `SearchableDropdown` component:

   ```tsx
   <SearchableDropdown
     options={[
       { value: "apple", label: "Apple" },
       { value: "banana", label: "Banana" },
       { value: "cherry", label: "Cherry" },
     ]}
     placeholder="Select a fruit"
     onChange={(value) => console.log(value)}
   />
   ```

## Components

### SearchableDropdown

The `SearchableDropdown` component is a custom dropdown component that allows users to search for an item in the dropdown list.

#### Props

It has the following props:

- `label` (string): The label for the dropdown.
- `options` (Array<{ label: string, value: string }>): The list of options to display in the dropdown.
- `multiple` (boolean): If true, allows multiple selections. Defaults to false.
- `searchable` (boolean): If true, enables the search functionality. Defaults to false.
- `usePortal` (boolean): If true, renders the dropdown options in a portal. Defaults to `false`.
- `onSelectionChange` (function): Callback function that is called when the selection changes. Receives the selected options as an argument.

#### Example

```tsx
<SearchableDropdown
  label="Select a fruit"
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ]}
  multiple
  searchable
  usePortal
  onSelectionChange={(selectedOptions) => console.log(selectedOptions)}
/>
```

