import './line-chart.css';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {CardBody} from "../card/card-body";
import {Card} from '../card/card';
import {CardHeader} from "../card/card-header";

export const LineChart = () => {
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
                }
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

    const labels = [
        new Date('2021-11-25').toLocaleDateString(),
        new Date('2021-11-26').toLocaleDateString(),
        new Date('2021-11-27').toLocaleDateString(),
        new Date('2021-11-28').toLocaleDateString(),
        new Date('2021-11-29').toLocaleDateString()
    ];

    const data = {
        labels,
        datasets: [
            {
                label: 'Заполненность мусором',
                data: [10, 70, 30, 60, 50],
                borderColor: 'rgba(2,133,88, 1)',
                backgroundColor: 'rgba(13,176,96,0.5)',
                radius: 5
            }
        ],
    };

    return (
        <Card className={'line-chart'}>
            <CardHeader>
                Заполненность баков
            </CardHeader>
            <CardBody className={'line-chart__body'}>
                <Line data={data} options={options}/>
            </CardBody>
        </Card>
    )
}