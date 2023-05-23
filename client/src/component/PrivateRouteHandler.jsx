import { useState , useEffect} from "react";
import { validateToken } from "../service/authenticator.service";
import { Navigate } from "react-router-dom";

export const PrivateRouteHandler = ({ element: Element, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState("loading");
  
    useEffect(() => {
      const checkAuthentication = async () => {
        const authenticated = await validateToken();
        setIsAuthenticated(authenticated);
      };
  
      checkAuthentication();
    }, []);
  
    if (!isAuthenticated) {
      return <Navigate to="/u/login" replace={true} />;
    }
  
    return isAuthenticated === "loading" ? ( <h1>Loading...</h1> ) : ( <Element {...rest} /> );
};