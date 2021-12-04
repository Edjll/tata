import {useEffect, useState} from "react";
import {ChartData, ScatterDataPoint} from "chart.js";
import {RequestService} from "../../service/request-service";
import {LineChart} from "./line-chart";
import {useParams} from "react-router-dom";

interface FriendOfHuman {
    date: string,
    count: number
}

export const FriendOfHumanChart = () => {
    const [data, setData] = useState<ChartData<"line", (number | ScatterDataPoint | null)[], unknown>>({
        labels: [], datasets: []
    });
    const params = useParams();

    useEffect(() => {
        RequestService
            .getInstance()
            .get(
                RequestService.BACKEND_URL + 'v1/statistics/friend-of-human',
                {
                    params: {
                        cameraId: params.id
                    }
                }
            ).then(response => {
            const elements: FriendOfHuman [] = response.data;
            setData({
                labels: elements.map(element => new Date(element.date).toLocaleTimeString()),
                datasets: [
                    {
                        label: 'Количество животных',
                        data: elements.map(element => element.count),
                        borderColor: 'rgb(180,6,33)',
                        backgroundColor: 'rgba(220,14,14,0.5)'
                    }
                ]
            });
        });
    }, [params]);

    return (
        <LineChart data={data} title={'Количество животных за сутки'}/>
    )
}