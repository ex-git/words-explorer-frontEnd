import React from 'react'

export default function ranking(props) {
    const rank = props.ranks.map((rank, idx)=>
        <li key={idx}>
            {rank.name} - {rank.score}
        </li>
    )
    return (
        <section>
            <h3>Glonbal Ranking</h3>
            <ol>
                {rank}
            </ol>
        </section>
    )
}
