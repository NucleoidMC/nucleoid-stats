import { Statistic } from "../src/model/statistics";

interface Props {
    stat: Statistic
}

const StatisticDisplay: React.FC<Props> = (props) => {
    // some assumptions to make for now
    if (props.stat[0].endsWith('_time')) {
        return <>
            {Math.round(props.stat[1] / 20)}s
        </>
    }

    return <>
        {Math.round(props.stat[1])}
    </>
}

export default StatisticDisplay;
