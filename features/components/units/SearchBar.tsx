import Image from "next/image";
import search from "@/assets/icons/search.svg";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    onSearch(keyword);
  };

  return (
    <div
      className="w-full h-8 bg-transparent flex items-center justify-between
    "
    >
      <Image
        src={search}
        alt="search"
        className="w-4 h-4 mr-2
      "
      />
      <input
        type="text"
        className="w-full h-full bg-transparent border-b border-black text-left text-sm font-pretendard font-normal placeholder:custom_gray placeholder:font-pretendard placeholder:font-normal focus:outline-none
        "
        placeholder=""
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
