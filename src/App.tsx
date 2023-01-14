import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log("hydrate ok");
  }, []);
  return <div>R18 Streaming with TS</div>;
};

export default App;
