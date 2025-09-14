import { siPostgresql } from "simple-icons";

export default function PostgreSQLIcon(props) {
    return (
        <svg
            role="img"
            viewBox={`0 0 24 24`}
            fill="currentColor"
            aria-label={siPostgresql.title}
            {...props}
        >
            <path d={siPostgresql.path}
                stroke="currentColor"
                strokeWidth={1} />
        </svg>
    );
}
