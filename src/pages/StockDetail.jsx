import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import finnhub from "../apis/finnhub"
import { StockShart } from "../components/StockShart"
import { StockData } from "../components/StockData"

const fromatData = (data) => {
    return data.t.map((e, i) => {
        return {
            x: e * 1000,
            y: data.c[i].toFixed(2)
        }
    })
}

export const StockDetail = () => {
    const [chartData, setChartData] = useState()
    const {symbol} = useParams()

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime() / 1000)
            let oneDay;
            if (date.getDay() === 6) {
                oneDay = currentTime - 2 * 24 * 60 * 60
            }else if (date.getDay() === 0) {
                oneDay = currentTime - 3 * 24 * 60 * 60                
            }else {
                oneDay = currentTime - 24 * 60 * 60
            }
            const oneWeek = currentTime - 7 * 24 * 60 * 60
            const oneYear = currentTime - 365 * 24 * 60 * 60
            let ar = [{from:oneDay, reso:30}, {from:oneWeek, reso:60}, {from:oneYear, reso:'W'}]
            try{
                const res = await Promise.all(ar.map(el => {
                    return (finnhub.get('/stock/candle', {
                        params: {
                            symbol,
                            from: el.from,
                            to: currentTime,
                            resolution: el.reso
                        }
                    }))
                }))
                if (isMounted) {
                    setChartData({
                        day: fromatData(res[0].data),
                        week: fromatData(res[1].data),
                        year: fromatData(res[2].data),
                    })
                }
            }catch (e) {console.log(e)}
        }

        fetchData()

        return () => (isMounted = false)

    }, [symbol])

    return <div>
        {chartData && (
            <div>
                <StockShart chartData={chartData} symbol={symbol} />
                <StockData symbol={symbol} />
            </div>)}
    </div>
}













// const res = await Promise.all([finnhub.get('/stock/candle', {
                //     params: {
                //         symbol,
                //         from: oneDay,
                //         to: currentTime,
                //         resolution: 30
                //     }
                // }), finnhub.get('/stock/candle', {
                //     params: {
                //         symbol,
                //         from: oneWeek,
                //         to: currentTime,
                //         resolution: 60
                //     }
                // }), finnhub.get('/stock/candle', {
                //     params: {
                //         symbol,
                //         from: oneYear,
                //         to: currentTime,
                //         resolution: 'W'
                //     }
                // })])
                // if (isMounted) {
                //     setStock(res.data.result.filter(el => el.symbol === symbol))
                // }