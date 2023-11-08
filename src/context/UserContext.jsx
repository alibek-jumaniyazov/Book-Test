import { createContext, useContext, useEffect, useState } from "react";
import { allBooks } from "./api";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getBooks = async () => {
            const allBooksInfo = await allBooks();
            setBooks(allBooksInfo.data)
        }
        getBooks();
    }, [])

    const values = {
        books,
        setBooks,
        loading,
        setLoading
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
