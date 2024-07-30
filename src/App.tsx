/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import SearchableDropdown from "./components/SearchableDropdown/SearchableDropdown";

const fruitOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
  { label: "Honeydew", value: "honeydew" },
  { label: "Indian Fig", value: "indian_fig" },
  { label: "Jackfruit", value: "jackfruit" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Lemon", value: "lemon" },
];

function App() {
  const [_singleSelectSearchable, setSingleSelectSearchable] = useState<
    string[]
  >([]);
  const [_multiSelectSearchable, setMultiSelectSearchable] = useState<string[]>(
    []
  );
  const [_singleSelectNonSearchable, setSingleSelectNonSearchable] = useState<
    string[]
  >([]);
  const [_multiSelectNonSearchable, setMultiSelectNonSearchable] = useState<
    string[]
  >([]);

  return (
    <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Custom Dropdowns
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Single Select, Searchable
        </h2>
        <SearchableDropdown
          label="Select a fruit"
          options={fruitOptions}
          multiple={false}
          searchable={true}
          onSelectionChange={setSingleSelectSearchable}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Multi Select, Searchable
        </h2>
        <SearchableDropdown
          label="Select fruits"
          options={fruitOptions}
          multiple={true}
          searchable={true}
          onSelectionChange={setMultiSelectSearchable}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Single Select, Non-Searchable
        </h2>
        <SearchableDropdown
          label="Select a fruit"
          options={fruitOptions}
          multiple={false}
          searchable={false}
          onSelectionChange={setSingleSelectNonSearchable}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Multi Select, Non-Searchable
        </h2>
        <SearchableDropdown
          label="Select fruits"
          options={fruitOptions}
          multiple={true}
          searchable={false}
          onSelectionChange={setMultiSelectNonSearchable}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Single Select, Searchable, Use Portal
        </h2>
        <SearchableDropdown
          label="Select a fruit"
          options={fruitOptions}
          multiple={false}
          searchable={true}
          usePortal={true}
          onSelectionChange={setSingleSelectSearchable}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Multi Select, Searchable, Use Portal
        </h2>
        <SearchableDropdown
          label="Select fruits"
          options={fruitOptions}
          multiple={true}
          searchable={true}
          usePortal={true}
          onSelectionChange={setMultiSelectSearchable}
        />
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        Created with ❤️ by Eddy Permana - 2024
      </footer>
    </div>
  );
}

export default App;
