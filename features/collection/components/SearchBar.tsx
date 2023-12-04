interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    onSearch(keyword);
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." onChange={handleInputChange} />
    </div>
  );
};

export default SearchBar;
