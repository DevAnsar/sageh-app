import React from "react"
import { HasAuthProviderContextDispatcher } from "./../providers/AuthProvider"


function useHasAuthAction(){
    return React.useContext(HasAuthProviderContextDispatcher);

}
const changeHasAuth=status=>{
    const setHasAuth=useHasAuthAction();
    setHasAuth(status);
};

export {changeHasAuth}
export default useHasAuthAction;

