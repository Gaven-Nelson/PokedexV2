import { createContext, PropsWithChildren, useContext, useState } from "react";
const useValue = () => {
  const [artStyle, setArtStyle] = useState("");
  return {
    artStyle,
    setArtStyle,
  };
};
const ArtStyleContext = createContext({} as ReturnType<typeof useValue>);
const ArtStyleProvider = (props: PropsWithChildren<{}>) => {
  return <ArtStyleContext.Provider value={useValue()} {...props} />;
};
const useArtStyle = () => useContext(ArtStyleContext);
export { ArtStyleProvider, useArtStyle };
