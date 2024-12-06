import {createContext, PropsWithChildren, useContext} from "react";
import {UserStore} from "./UserStore";



const StoreContext = createContext<{user: UserStore} | null>(null);

export const StoreProvider = ({children}: PropsWithChildren)=>{
    const user = new UserStore();
    
    return( 
    <StoreContext.Provider value={{user}}>
        {children}
    </StoreContext.Provider>
);
};

export const useStore = () => useContext(StoreContext)