import React from "react"
import { HasAuthProviderContext  } from "./../providers/AuthProvider"

function useHasAuth() {
  return React.useContext(HasAuthProviderContext)
}

export default useHasAuth;

