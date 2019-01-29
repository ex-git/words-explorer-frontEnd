import React from 'react'
import {connect} from 'react-redux'
import {USERS_ENDPOINT} from './config'
import {updateRanks} from '../actions'
import './ranking.css'

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
        const rank = this.props.ranks.slice(0,5).map((rank, idx)=>
        <li key={idx}>
            <span className='explorerName'>{rank.name}</span> - score: {rank.score}
        </li>
    )
    return (
        <section className='topExplorer'>
            <h2>Top 5 Words Explorer</h2>
            <ul className='top5'>
                {rank}
            </ul>
        </section>
    )
    }
    
}

const mapStateToProps = state => ({
    ranks: state.wordsExplorerReducer.ranks
})

export default connect(mapStateToProps)(ranking)
