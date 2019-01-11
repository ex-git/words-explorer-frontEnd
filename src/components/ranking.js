import React from 'react'
import {connect} from 'react-redux'

export function ranking(props) {
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

const mapStateToProps = state => ({
    ranks: state.ranks
})

export default connect(mapStateToProps)(ranking)
