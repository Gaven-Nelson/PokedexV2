import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

const useValue = () => {
  interface Meta {
    current_page: number;
    last_page: number;
  }

  const [meta, setMeta] = useState<Meta>();
  return {
    meta,
    setMeta,
  };
};
const MetaValueContext = createContext({} as ReturnType<typeof useValue>);
const MetaValueProvider = (props: PropsWithChildren<{}>) => {
  return <MetaValueContext.Provider value={useValue()} {...props} />;
};
const useMetaValue = () => useContext(MetaValueContext);
export { MetaValueProvider, useMetaValue };
