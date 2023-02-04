import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import finnhub from "../apis/finnhub"
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs"
import { WatchListContext } from "../context/WatchListContext"

export const StockList = () => {
    const [stock, setStock] = useState([])
    const { watchList, deleteStock } = useContext(WatchListContext)

    const navigate = useNavigate()

    const handleColor = (p) => {
        return p > 0 ? "success" : "danger"
    }

    const handleArrow = (p) => {
        return p > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
    }

    const handleSelektedStock = (symbol) => {
        navigate(`detail/${symbol}`)
    }

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const responses = await Promise.all(watchList.map(stock => {
                    return (finnhub.get('/quote', {
                        params: {
                            symbol: stock
                        }
                    }))
                }))
                if (isMounted) {
                    setStock(responses.map(res => {
                        return {
                            data: res.data,
                            symbol: res.config.params.symbol
                        }
                    }))
                }
            } catch (e) { console.log(e) }
        }
        fetchData()
        
        localStorage.setItem('watchList', JSON.stringify(watchList))
        
        return () => (isMounted = false)
    }, [watchList])

    return <div>
        <table className="table hover mt-5">
            <thead style={{ color: "rgb(79,89,102)" }}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Pclose</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {stock.map(st => {
                    return (
                        <tr onClick={() => handleSelektedStock(st.symbol)} style={{cursor: "pointer"}} className="table-row" key={st.symbol}>
                            <th scope="row">{st.symbol}</th>
                                <td>{st.data.c}</td>
                                <td className={`text-${handleColor(st.data.d)}`}>{st.data.d} {handleArrow(st.data.d)}</td>
                                <td className={`text-${handleColor(st.data.dp)}`}>{st.data.dp} {handleArrow(st.data.dp)}</td>
                                <td>{st.data.h}</td>
                                <td>{st.data.l}</td>
                                <td>{st.data.o}</td>
                                <td>{st.data.pc} 
                                    <button 
                                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button" 
                                    onClick={(e) => deleteStock(e, st.symbol)}
                                    >
                                        delete
                                    </button>
                                </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
}