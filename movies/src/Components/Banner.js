import React, { Component } from 'react'
import axios from 'axios'

export default class Banner extends Component {
    constructor() {
        super()
        this.state = {
            banner: []
        }
    }
    componentDidMount = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=0fb119ee849e82b5df1bdad0e177309e&page=1`);
        let movObj = res.data.results[this.random()];
        let ban = [movObj.backdrop_path, movObj.original_title ? movObj.original_title : movObj.name, movObj.overview]
        this.setState({
            banner: ban
        });
        // console.log(this.random());
    }
    random = (min = 0, max = 20) => {
        let num = Math.random() * (max - min) + min
        return Math.floor(num)
    }
    render() {
        return (
            <div>
                <div className="card bannerCard">
                    <div className="overlay"></div>
                    <div className='cardImg'>
                        <img src={`https://image.tmdb.org/t/p/original${this.state.banner[0]}`} alt="img" />
                    </div>
                    <div className="card-body cardBody">
                        <h2 className="card-title">{this.state.banner[1]}</h2>
                        <p className="card-text">{this.state.banner[2]}</p>
                    </div>
                </div>
            </div>
        )
    }
}
