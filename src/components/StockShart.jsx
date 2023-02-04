import Chart from "react-apexcharts"
import { useState } from "react"

export const StockShart = ({chartData, symbol}) => {
    const {day, week, year} = chartData

    const [dateFormat, setDateFormat] = useState("24h")
    const handleTimeFormat = () => {
        switch(dateFormat) {
            case "24h": return day
            case "7d": return week
            case "1y": return year
            default: return day
        }
    }

    const color = handleTimeFormat()[handleTimeFormat().length -1].y - handleTimeFormat()[0].y > 0 ? "#26c281" : "#ed3419"

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px",
            }
        },
        chart: {
            id: 'stock data',
            animation: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
    }


    const series = [{
        name: symbol,
        data: handleTimeFormat()
    }]

    const hundleClass = (p) => {
        return p === dateFormat ? "btn m-1 btn-primary" : "btn m-1 btn-outline-primary"
    }

    return <div className='mt-5 p-4 shadow-sm bg-white' style={{width: "80%", marginLeft: "auto", marginRight:"auto" }}>
        <Chart options={options} series={series} type="area" width="100%" />
        <div>
            <button className={hundleClass('24h')} onClick={() => setDateFormat("24h")}>24h</button>
            <button className={hundleClass('7d')} onClick={() => setDateFormat("7d")}>7d</button>
            <button className={hundleClass('1y')} onClick={() => setDateFormat("1y")}>1y</button>
        </div>
    </div>
}