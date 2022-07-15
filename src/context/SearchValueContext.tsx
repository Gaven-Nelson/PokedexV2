import { createContext, PropsWithChildren, useContext, useState } from "react";
const useValue = () => {
  const [searchValue, setSearchValue] = useState("");
  return {
    searchValue,
    setSearchValue,
  };
};
const SearchValueContext = createContext(
  {} as ReturnType<typeof useValue>
);
const SearchValueProvider = (props: PropsWithChildren<{}>) => {
  return <SearchValueContext.Provider value={useValue()} {...props} />;
};
const useSearchValue = () => useContext(SearchValueContext);
export { SearchValueProvider, useSearchValue };
