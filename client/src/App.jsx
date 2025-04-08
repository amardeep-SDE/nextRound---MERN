import Login from "./auth/Login";
import Signup from "./auth/Signup";
import {createBrowserRouter} from "react-router-dom"

const appRouter = createBrowserRouter([
  {
    
  }
])
const App = () => {
  return (
    <>
      <Signup />
      {/* <Login/> */}
    </>
  );
};
export default App;
