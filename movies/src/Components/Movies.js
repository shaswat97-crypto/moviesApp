import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: '',
      pageArr: [1],
      currPage: 1,
      movies: [],
      favArr: []
    }
  }
  async componentDidMount() {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=0fb119ee849e82b5df1bdad0e177309e&page=${this.state.currPage}`);
    let movData = res.data;
    console.log(movData);
    let movArr = movData.results.map((movObj) => {
      return [movObj.backdrop_path, movObj.original_title ? movObj.original_title : movObj.name, movObj.id];
    })
    let favArrL = JSON.parse(localStorage.getItem('favMov') || '[]');
    let arr = [];
    for (let i = 0; i < favArrL.length; i++) {
      arr.push(favArrL[i].id);
    }
    this.setState({
      movies: [...movArr],
      favArr: [...arr]
    })
  }
  changeMovies = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=0fb119ee849e82b5df1bdad0e177309e&page=${this.state.currPage}`);
    let movData = res.data;
    // console.log(movData);
    // console.log(this.state.currPage);
    let movArr = movData.results.map((movObj) => {
      return [movObj.backdrop_path, movObj.original_title ? movObj.original_title : movObj.name, movObj.id];
    })
    this.setState({
      movies: [...movArr]
    })
  }
  handleNext = () => {
    let currP = this.state.currPage + 1;
    let arr = [...this.state.pageArr];
    if (arr.includes(currP)) {
      this.setState({
        currPage: this.state.currPage + 1
      }, this.changeMovies);
    }
    else {
      arr.push(this.state.currPage + 1);
      console.log(arr);
      this.setState({
        currPage: this.state.currPage + 1,
        pageArr: [...arr]
      }, this.changeMovies)
    }
  }
  handlePrev = () => {
    let arr = [...this.state.pageArr];
    if (this.state.currPage > 1) {
      let currP = this.state.currPage;
      if (currP != arr[arr.length - 1]) {
        this.setState({
          currPage: this.state.currPage - 1
        }, this.changeMovies)
      } else {
        arr.pop();
        this.setState({
          currPage: this.state.currPage - 1,
          pageArr: [...arr]
        }, this.changeMovies)
      }
    }
    else if(arr.length>1){
      arr.pop();
      this.setState({
        pageArr: [...arr]
      })
    }
  }
  handleClick = (p) => {
    if (this.state.currPage != p) {
      this.setState({
        currPage: p
      }, this.changeMovies)
    }
  }
  addToLocal = async (id) => {
    console.log(id);
    const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=0fb119ee849e82b5df1bdad0e177309e&page=${this.state.currPage}`);
    let movData = res.data.results;
    let favArrL = [];
    localStorage.getItem('favMov') ? favArrL = JSON.parse(localStorage.getItem('favMov')) : favArrL = [];
    let check = false;
    favArrL.forEach(obj => {
      if (obj.id == id) {
        check = true;
      }
    });
    if (!check) {
      movData.forEach((mov) => {
        if (mov.id == id) {
          favArrL.push(mov);
        }
      })
    }
    else {
      // console.log(favArrL)
      let a = [];
      for (let i = 0; i < favArrL.length; i++) {
        if (favArrL[i].id != id) a.push(favArrL[i]);
      }
      favArrL = [...a];
      // console.log(favArrL);
    }
    localStorage.setItem("favMov", JSON.stringify(favArrL));

    let arr = [];
    for (let i = 0; i < favArrL.length; i++) {
      arr.push(favArrL[i].id);
    }
    this.setState({
      favArr: [...arr]
    })
  }
  render() {
    return (
      <>
        {
          this.state.movies.length == 0 ?
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> :
            <div>
              <h3 id='trending'>Trending</h3>
              <div className='movCont'>
                {
                  this.state.movies.map((movArr) => (
                    <div onMouseLeave={() => this.setState({ hover: '' })} onMouseEnter={() => this.setState({ hover: movArr[2] })} className="bannerCardMov" key={movArr[2]}>
                      <div className='overlay'></div>
                      <h2 className="movName">{movArr[1]}</h2>
                      <div className='cardImgMov'><img src={`https://image.tmdb.org/t/p/original${movArr[0]}`} alt="img" /></div>
                      {
                        this.state.hover == movArr[2] &&
                        <div className='buttonCont'>
                          {
                            this.state.favArr.includes(movArr[2]) ? <a onClick={() => this.addToLocal(movArr[2])} className="btn btn-primary but">Remove from favourites</a> : <a onClick={() => this.addToLocal(movArr[2])} className="btn btn-primary but">Add to favourites</a>
                          }
                        </div>
                      }
                    </div>
                  ))
                }
              </div>

              <div className='pagin'>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item "><a className="page-link but" onClick={this.handlePrev} href='#trending'>Previous</a></li>
                    {
                      this.state.pageArr.map((p) => (
                        p == this.state.currPage ?
                          <li key={p} className="page-item active" aria-current="page">
                            <a className="page-link" href="#trending">{p}</a>
                          </li> :
                          <li key={p} className="page-item " ><a className="page-link but" onClick={() => this.handleClick(p)} href='#trending'>{p}</a></li>
                      ))
                    }
                    <li className="page-item"><a className="page-link but" onClick={this.handleNext} href='#trending'>Next</a></li>
                  </ul>
                </nav>
              </div>
            </div>
        }
      </>
    )
  }
}
