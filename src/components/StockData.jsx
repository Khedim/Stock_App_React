import { useState, useEffect } from "react"
import finnhub from "../apis/finnhub"

export const StockData = ({symbol}) => {
    const [data, setdata] = useState()

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try{
                const res = await finnhub.get('/stock/profile2', {
                    params: {
                        symbol
                    }
                })
                if (isMounted) {
                    setdata(res.data)
                }
            }catch (e) {console.log(e)}
        }
        fetchData()
        return () => (isMounted = false)
    }, [symbol])
    
    return <div>
        {data && <div className="row border bg-white rounded shadow-sm p-4 mt-5 mb-5" style={{width: "80%", marginLeft: "auto", marginRight:"auto" }}>
                <div className="col">
                    <div>
                        <span className="fw-bold">Name: </span>{data.name}
                    </div>
                    <div>
                        <span className="fw-bold">Country: </span>{data.country}
                    </div>
                    <div>
                        <span className="fw-bold">Ticker: </span>{data.ticker}
                    </div>
                </div>
                <div className="col">
                    <div>
                        <span className="fw-bold">Exchange: </span>{data.exchange}
                    </div>
                    <div>
                        <span className="fw-bold">Industry: </span>{data.finnhubIndustry}
                    </div>
                    <div>
                        <span className="fw-bold">IPO: </span>{data.ipo}
                    </div>

                </div>
                <div className="col">
                    <div>
                        <span className="fw-bold">MarketCap: </span>{data.marketCapitalization}
                    </div>
                    <div>
                        <span className="fw-bold">Shares Outstanding: </span>{data.shareOutstanding}
                    </div>
                    <div>
                        <span className="fw-bold">url: </span><a href={data.weburl}>{data.weburl}</a>
                    </div>

                </div>
            </div>}
    </div>
}