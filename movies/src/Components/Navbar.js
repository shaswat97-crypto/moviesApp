import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Movies extends Component {
  render() {
    return (
      <div className='nav' style={{display: 'flex', alignItems:'center', justifyContent:'space-between', padding:'12px', margin:'4px'}}>
        <Link style={{textDecoration:'none'}} to='/'><div className='appName'>MoviesApp</div></Link>
        <Link to='/favourites' style={{textDecoration:'none'}}><div className='fav'>My Favourites</div></Link>
      </div>
    )
  }
}
