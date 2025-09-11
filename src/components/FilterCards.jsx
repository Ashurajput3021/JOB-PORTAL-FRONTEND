// src/pages/FilterCards.jsx
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const filterData = [
  {
    filterType: "📍 Location",
    array: [
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Chennai",
      "Noida",
      "Gurgaon",
      "Kolkata",
    ],
  },
  {
    filterType: "💼 Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "UI/UX Designer",
      "DevOps Engineer",
    ],
  },
  {
    filterType: "💰 Salary",
    array: [
      "0-40k",
      "42k-1 Lakh",
      "1 Lakh to 5 Lakh",
      "5 Lakh - 10 Lakh",
      "10+ Lakh",
    ],
  },
];

const FilterCards = ({ onFilterChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
    onFilterChange(value); // ✅ pass selected filter to parent
  };

  const clearFilters = () => {
    setSelectedValue(""); // reset local state
    onFilterChange(""); // reset parent filter
  };

  return (
    <div className="w-full max-h-[500px] overflow-y-auto bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-5 rounded-2xl shadow-xl border border-gray-200">
      <h1 className="font-extrabold text-xl text-gray-800 mb-3 sticky top-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-3 z-10 rounded-md">
        🔎 Filter Jobs
      </h1>

      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-6"
      >
        {filterData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 
                       bg-gradient-to-br from-white via-gray-50 to-blue-50"
          >
            <h2 className="font-semibold text-lg text-gray-700 mb-3 border-b pb-2">
              {data.filterType}
            </h2>

            <div className="space-y-3">
              {data.array.map((item, idx) => {
                const id = `${data.filterType}-${idx}`;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3 hover:bg-gray-100 rounded-md px-2 py-1 cursor-pointer transition"
                  >
                    <RadioGroupItem
                      value={item}
                      id={id}
                      className="w-5 h-5 border-2 border-gray-400 rounded-full data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor={id}
                      className="text-gray-600 text-sm cursor-pointer hover:text-gray-900 transition"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>

      {/* ✅ Clear Filters button */}
      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          className="px-6 py-2 text-sm font-semibold text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterCards;
