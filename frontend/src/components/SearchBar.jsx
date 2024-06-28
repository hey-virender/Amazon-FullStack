import { useState, useRef, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useContext } from "react";
import { AmazonContext } from "../contexts/AmazonContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const { Socket } = useContext(AmazonContext);
  const searchBarRef = useRef(null);
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home",
    "Beauty",
    "Kids",
    "Health & Fitness",
    "Travel",
    "Services",
    "Other",
  ];
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState();

  const handleSearch = (query) => {
    Socket.emit("searchProducts", query);
  };

  Socket.on("searchResults", (data) => {
    if (data.type == "searchResults") {
      setSearchResults(data.results);
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchText);
      }}
      className="relative search-bar w-2/5 h-9 flex items-center rounded-md"
      ref={searchBarRef}
    >
      <select
        className="h-full w-12 text-xs rounded-l-md outline-none border-none"
        name="category-selector"
        id="category-selector"
        defaultValue={categories[0]}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        className="h-full text-xs w-full px-2"
        type="text"
        placeholder="Search for products or brands"
        onChange={(e) => {
          setSearchText(e.target.value);
          setSearchResults([]);
          handleSearch(e.target.value);
        }}
      />
      <button
        type="submit"
        className="h-full w-8 flex items-center justify-center rounded-r-md bg-orange-500 px-2 py-1"
      >
        <FaMagnifyingGlass className="text-xl" />
      </button>
      <div
        className={`py-4 w-full h-52  absolute -bottom-52 bg-white ${
          searchResults.length > 0 ? "visible" : "hidden"
        }`}
      >
        {searchResults.map((product) => (
          <div
            key={product._id}
            className="flex justify-around cursor-pointer select-none"
            onClick={() => {
              setSearchResults([]);
              navigate(`/products/${product._id}`);
            }}
          >
            <div className="h-16 w-16">
              <img
                className="h-full w-full object-contain rounded-md"
                src={product.image}
                alt={product.name}
              />
            </div>
            <span className="w-2/3 line-clamp-1 text-[0.6rem] overflow-clip ">
              {product.name}
            </span>
          </div>
        ))}
      </div>
    </form>
  );
};

export default SearchBar;
