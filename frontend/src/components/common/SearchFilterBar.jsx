
import React from "react";

const SearchFilterBar = ({
  value = "",
  onChange,
  placeholder = "Search...",
}) => {

  return (
    <div className="search-wrapper">

      <span>
        🔎
      </span>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange?.(
            event.target.value
          )
        }
      />

    </div>
  );
};

export default SearchFilterBar;