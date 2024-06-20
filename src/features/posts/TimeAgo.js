import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
    let timeAgo = '';

    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }

    return (
        <div className="mb-1" title={timestamp}><i>{timeAgo}</i></div>
    )
}

export default TimeAgo