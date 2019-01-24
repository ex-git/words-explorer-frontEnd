import React from 'react'
import {connect} from 'react-redux'
import {USERS_ENDPOINT} from './config'
import {updateRanks} from '../actions'

export class ranking extends React.Component {
    componentDidMount(){
        fetch(USERS_ENDPOINT)
        .then(res=>{
            if(res.ok) {
                return res.json()
            }
            return new Promise.resolve()
        })
        .then(resJSON=>{
            this.props.dispatch(updateRanks(resJSON))
        })
        .catch(()=>
            Promise.resolve()
        )
    }
    render() {
        const rank = this.props.ranks.map((rank, idx)=>
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
    
}

const mapStateToProps = state => ({
    ranks: state.wordsExplorerReducer.ranks
})

export default connect(mapStateToProps)(ranking)
