import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateOpenGame} from '../actions'
import {GAMES_ENDPOINT} from './config'

export class openGame extends React.Component {
    componentDidMount(){
        this.fetchUpdate = setInterval(function(){
            fetch(GAMES_ENDPOINT)
            .then(res=>{
                if(res.ok) {
                    return res.json()
                }
                return new Promise.resolve()
            })
            .then(resJSON=>{
                this.props.dispatch(updateOpenGame(resJSON))
            })
            .catch(()=>
                Promise.resolve()
            )
        }.bind(this), 2000)
    }
    componentWillUnmount() {
        clearInterval(this.fetchUpdate)
    }
    render() {
        const openGames = this.props.availableGames.map((game, idx)=>
        <li key={idx}>
            Game ID: {game} >
            <Link to={`/game/${game}`}>Join</Link>
        </li>)
        return (
            <section>
            <h3>Opening game</h3>
                <ul>
                    {openGames}
                </ul>
            </section>
        )
    }
    
}
 const mapStateToProps = state => ({
    availableGames: state.wordsExplorerReducer.availableGames
 })

 export default connect(mapStateToProps)(openGame)