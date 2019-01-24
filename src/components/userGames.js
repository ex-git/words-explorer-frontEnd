import React from 'react'
import {connect} from 'react-redux'
import {GAMES_ENDPOINT} from './config'

export class userGames extends React.Component {
    componentDidMount(){
        fetch(GAMES_ENDPOINT)
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
        <div>
            
        </div>
    )
    }
    
}

const mapStateToProps = state => ({
    ranks: state.wordsExplorerReducer.ranks
})

export default connect(mapStateToProps)(ranking)
