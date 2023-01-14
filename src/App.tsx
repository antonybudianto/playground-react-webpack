import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // @ts-ignore: to test swc plugin!
    console.log("hydrate ok", __DEV__);
  }, []);
  return <div>R18 Streaming with TS</div>;
};

export default App;
