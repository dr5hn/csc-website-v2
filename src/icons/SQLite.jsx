import { siSqlite } from "simple-icons";

export default function SQLiteIcon(props) {
    return (
        <svg
            role="img"
            viewBox={`0 0 24 24`}
            fill="currentColor"
            aria-label={siSqlite.title}
            {...props}
        >
            <path d={siSqlite.path} />
        </svg>
    );
}
