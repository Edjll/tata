import './line-chart.css';
import {
    CategoryScale,
    Chart as ChartJS,
    ChartData,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    ScatterDataPoint,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {CardBody} from "../card/card-body";
import {Card} from '../card/card';
import {CardHeader} from "../card/card-header";

interface LineChartProps {
    data: ChartData<"line", (number | ScatterDataPoint | null)[], unknown>,
    title: string,
    min?: number,
    max?: number
}

export const LineChart = ({data, title, min, max}: LineChartProps) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    stepSize: 2,
                    font: {
                        size: 16,
                        family: '"Comfortaa-Bold", sans-serif'
                    },
                    padding: 10
                },
                min: min ? min : undefined,
                max: max ? max: undefined
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 16,
                        family: '"Comfortaa-Bold", sans-serif'
                    },
                    padding: 10
                }
            }
        }
    };

    return (
        <Card className={'line-chart'}>
            <CardHeader>
                {title}
            </CardHeader>
            <CardBody className={'line-chart__body'}>
                <Line data={data} options={options}/>
            </CardBody>
        </Card>
    )
}