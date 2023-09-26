import { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export function PageContextProvider({ children }) {
    const [page, setPage] = useState(12);

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    );
}

export function usePageContext() {
    return useContext(PageContext);
}