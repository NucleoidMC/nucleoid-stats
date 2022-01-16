import { Statistic } from "../src/model/statistics";

interface Props {
    stat: Statistic
    no_adjust?: boolean
}

const StatisticDisplay: React.FC<Props> = (props) => {
    // some assumptions to make for now
    if (props.stat[0].endsWith('_time')) {
        return <>
            {!props.no_adjust ? Math.round(props.stat[1] / 20) : props.stat[1].toFixed(2)}s
        </>
    }

    return <>
        {Math.round(props.stat[1])}
    </>
}

export default StatisticDisplay;
