import { useState, useEffect, useContext } from "react"
import finnhub from "../apis/finnhub"
import { WatchListContext } from "../context/WatchListContext"

export const AutoComplite = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const {addStock} = useContext(WatchListContext)

    const handleDropdown = () => {
        const dropdownClass = search ? " show" : null
        return <ul className={`dropdown-menu ${dropdownClass}`}
            style={{
                height: "500px",
                overflowY: "scroll",
                overflowX: "hidden",
                cursor: "pointer"
            }}
        >
            {results.map(result => 
                {return <li 
                    className="dropdown-item" 
                    key={result.symbol}
                    onClick={() => {
                        addStock(result.symbol)
                        setSearch("")
                    }}
                    >
                        {result.description} ({result.symbol})
                    </li>
                })}
        </ul>
    }

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const res = await finnhub.get('/search', {
                    params: {
                        q: search
                    }
                })
                if (isMounted) {
                    setResults(res.data.result)
                }
            }catch (e) { console.log(e) }     
        }
        if (search.length > 0) {
            fetchData()
        }else {
            setResults([])
        }

        return () => (isMounted = false)

    }, [search])

    return <div className="w-50 p-5 rounded mx-auto">
        <div className="form-floating dropdown">
            <input 
                style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }} 
                id="search" 
                type="text" 
                className="form-control"
                placeholder="Search"
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            ></input>
            <label htmlFor="search">Search</label>
            {handleDropdown()}
        </div>
    </div>
}