import {useEffect, useState} from "react";
import {ChartData, ScatterDataPoint} from "chart.js";
import {RequestService} from "../../service/request-service";
import {LineChart} from "./line-chart";
import {useParams} from "react-router-dom";

interface CleanCity {
    date: string,
    fullConfidence: number,
    emptyConfidence: number
}

export const CleanCityChart = () => {
    const [data, setData] = useState<ChartData<"line", (number | ScatterDataPoint | null)[], unknown>>({
        labels: [], datasets: []
    });
    const params = useParams();

    useEffect(() => {
        RequestService
            .getInstance()
            .get(
                RequestService.BACKEND_URL + 'v1/statistics/clean-city',
                {
                    params: {
                        cameraId: params.id
                    }
                }
            ).then(response => {
            const elements: CleanCity [] = response.data;
            setData({
                labels: elements.map(element => new Date(element.date).toLocaleDateString()),
                datasets: [
                    {
                        label: 'Вероятность заполненности баков',
                        data: elements.map(element => element.fullConfidence * 100),
                        borderColor: 'rgb(180,6,33)',
                        backgroundColor: 'rgba(220,14,14,0.5)'
                    }, {
                        label: 'Вероятность пустоты баков',
                        data: elements.map(element => element.emptyConfidence * 100),
                        borderColor: 'rgba(2,133,88, 1)',
                        backgroundColor: 'rgba(13,176,96,0.5)'
                    }
                ]
            });
        });
    }, [params]);

    return (
        <LineChart data={data} title={'Вероятности заполненности'} min={0} max={100}/>
    )
}