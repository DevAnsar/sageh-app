import React, {useEffect,useState, createContext} from "react"

// export const HasAuthProviderContext = createContext();
// export const HasAuthProviderContextDispatcher = createContext();

export const AuthTokenProviderContext = createContext();
export const AuthTokenProviderContextDispatcher = createContext();

// export const AUTH_KEY = "hasLogin";
export const AUTH_TOKEN = "authToken";
// export  const EXPIRE_DATE = "token_expire";


const getPars=str=> {

    return JSON.parse(str);
}

function AuthProvider({children}) {

    // const [hasLogin, setHasLogin] = useState(getPars(localStorage.getItem(AUTH_KEY) || false));
    const [authToken, setAuthToken] = useState(getPars(localStorage.getItem(AUTH_TOKEN) || null));
    // const history = useHistory();

    useEffect(() => {
        if (authToken === null) {
            // console.log('here');
            setAuthToken(null);
        }
        // localStorage.setItem(AUTH_KEY, getPars(hasLogin));
        localStorage.setItem(AUTH_TOKEN, getPars(authToken));

        // async function getMe() {
        //     await sagehAxios.post(`auth/me`, {}, {
        //         headers: {
        //             'Authorization': 'bearer ' + authToken
        //         }
        //     }).then(response => {
        //         let {id} = response.data;
        //         if (!id) {
        //             history.push("/");
        //         }
        //         // if (response.name);
        //     }).catch(err => {
        //         console.log(err.message);
        //         history.push("/");
        //     })
        // }

        // if (hasLogin && authToken !== null) {
        // getMe();
        // }

    }, [authToken]);

    return (
        // <HasAuthProviderContext.Provider value={hasLogin}>
            <AuthTokenProviderContext.Provider value={authToken}>

                {/*<HasAuthProviderContextDispatcher.Provider value={setHasLogin}>*/}
                    <AuthTokenProviderContextDispatcher.Provider value={setAuthToken}>
                        {children}
                    </AuthTokenProviderContextDispatcher.Provider>
                {/*</HasAuthProviderContextDispatcher.Provider>*/}

            </AuthTokenProviderContext.Provider>
        // </HasAuthProviderContext.Provider>
    )
}
//
// function useHasAuth() {
//     const has_auth = React.useContext(HasAuthProviderContext);
//
//     if (has_auth === undefined) {
//         throw new Error("render <AuthProvider /> at top of the tree")
//     }
//     return has_auth;
// }
//
// function useHasAuthSetState() {
//     const set_has_auth = React.useContext(HasAuthProviderContextDispatcher);
//
//     if (set_has_auth === undefined) {
//         throw new Error("render <AuthProvider /> at top of the tree")
//     }
//
//     return set_has_auth;
// }
//
// function useHasAuthActions() {
//     const setHasLogin = useHasAuthSetState();
//
//     const changeHasAuth = status => {
//         setHasLogin(status);
//     };
//
//     return {changeHasAuth};
// }


function useToken() {
    const token = React.useContext(AuthTokenProviderContext);

    if (token === undefined) {
        throw new Error("render <AuthProvider /> at top of the tree")
    }
    return token;
}

function useSetToken() {
    const setAuthToken = React.useContext(AuthTokenProviderContextDispatcher);

    if (setAuthToken === undefined) {
        throw new Error("render <AuthProvider /> at top of the tree")
    }

    return setAuthToken;
}

function useAuthTokenActions() {
    const setAuthToken = useSetToken();

    const changeToken = token => {
        setAuthToken(token);
    };

    return {changeToken};
}

//useHasAuth, useHasAuthSetState, useHasAuthActions,
export {useToken, useSetToken, useAuthTokenActions}
export default AuthProvider
