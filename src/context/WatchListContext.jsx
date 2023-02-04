import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {
    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem('watchList')) || ['GOOGL', 'MSFT', 'AMZN'])

    const addStock = (stock) => {
        if (!watchList.includes(stock)) {
            setWatchList(prevWatchList => [...prevWatchList, stock])
        }
    }

    const deleteStock = (e, stock) => {
        e.stopPropagation()
        setWatchList(watchList.filter(item => item !== stock))
    }

    return <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
        {props.children}
    </WatchListContext.Provider>
}