import React, { Component } from 'react'
import obj from './dummyMov'
import idConv from './idConv'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee, faSortUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export default class Favourties extends Component {
  constructor() {
    super()
    this.state = {
      genreArr: [],
      movies: [],
      currentGenre: 'All Genre',
      filteredMov: [],
      currText: '',
      limit: 4,
      pageCount: '',
      currPage: 1,
      pagesArr: [1]
    }
  }

  componentDidMount = () => {
    let movArr = JSON.parse(localStorage.getItem('favMov') || '[]');
    let gArr = ['All Genre'];
    movArr.forEach((mov) => {
      // console.log(mov.genre_ids[0])
      if (!gArr.includes(idConv[mov.genre_ids[0]])) {
        gArr.push(idConv[mov.genre_ids[0]]);
      }
    })
    // console.log(movArr, gArr);
    this.setState({
      movies: [...movArr],
      genreArr: [...gArr],
      filteredMov: [...movArr],
      // limit: movArr.length
    },this.updateMovWithGenreAndSearch);
  }

  handleGenre = (genre) => {
    this.setState({
      currentGenre: genre
    }, ()=>this.updateMovWithGenreAndSearch(1));
    // this.updateMovWithGenreAndSearch(1);
  }

  handleDelete = (movObj) => {
    let arr = this.state.movies;
    let arr2 = this.state.filteredMov;
    arr = arr.filter((mov) => mov.id != movObj.id);
    arr2 = arr2.filter((mov) => mov.id != movObj.id);

    let filterG = ['All Genre'];
    arr.forEach((mov) => {
      if (!filterG.includes(idConv[mov.genre_ids[0]])) {
        filterG.push(idConv[mov.genre_ids[0]]);
      }
    });
    // console.log(filterG);
    this.setState({
      movies: [...arr],
      filteredMov: [...arr2],
      genreArr: [...filterG]
    }, this.updateMovWithGenreAndSearch);
    localStorage.setItem('favMov', JSON.stringify(arr));
  }

  handleSearch(text) {
    this.setState({
      currText: text
    }, this.updateMovWithGenreAndSearch)
  }

  updateMovWithGenreAndSearch = (page = this.state.currPage) => {
    // console.log(page);
    let arr = this.state.movies;
    let genre = this.state.currentGenre, text = this.state.currText;

    // console.log(this.updateCurrPage(page))
    this.updateCurrPage(page);

    if (genre != 'All Genre') {
      arr = arr.filter((m) => {
        return idConv[m.genre_ids[0]] == genre
      });
    }

    if (text) {
      arr = arr.filter((mov) => {
        let name = mov.name || mov.title;
        name = name.toLowerCase();
        if (name.includes(text.toLowerCase())) {
          return true;
        }
      });
    }

    // console.log(arr)
    this.updatePageCount([...arr]);

    let si = (page - 1) * (this.state.limit), ei = page * this.state.limit;
    arr = arr.slice(si, ei);
    // console.log(arr, page, this.state.currPage);

    this.setState({
      filteredMov: [...arr]
    });
  }

  handleLimit = (text) => {
    if(!text) text = this.state.movies.length;
    this.setState({
      limit: Number(text)
    }, this.updateMovWithGenreAndSearch);
  }

  updatePageCount = (arrMov) =>{
    // console.log(arrMov)
    let pageCount = Math.ceil(arrMov.length / this.state.limit);
    // console.log(pageCount)
    this.setState({
      pageCount: pageCount
    }, this.updateCurrPage);
  }

  updateCurrPage = (page = this.state.currPage, pageCount=this.state.pageCount) =>{
    let arr = [];
    for (let i = 1; i <= pageCount; i++) {
      arr.push(i);
    }
    if(page>pageCount) page=1;

    this.setState({
      currPage:page,
      pagesArr: [...arr],
    });
    // console.log(page)
    // return page;
  }

  faSortDnPop = () => {
    let arr = this.state.movies;
    arr.sort(function (a, b) {
      return b.popularity - a.popularity;
    });
    this.setState({
      movies: [...arr]
    }, this.updateMovWithGenreAndSearch);
  }

  faSortUpPop = () => {
    let arr = this.state.movies;
    arr.sort(function (a, b) {
      return a.popularity - b.popularity;
    });
    this.setState({
      movies: [...arr]
    }, this.updateMovWithGenreAndSearch);
  }

  faSortDnRat = () => {
    let arr = this.state.movies;
    arr.sort(function (a, b) {
      return b.vote_average - a.vote_average;
    });
    this.setState({
      movies: [...arr]
    }, this.updateMovWithGenreAndSearch);
  }

  faSortUpRat = () => {
    let arr = this.state.movies;
    arr.sort(function (a, b) {
      return a.vote_average - b.vote_average;
    });
    this.setState({
      movies: [...arr]
    }, this.updateMovWithGenreAndSearch);
  }

  render() {

    return (
      <>
      {/* <div className="heading">My Favourites</div> */}
        <div className="row">
          <div className="col-lg-2 col-sm-12">
            <ul className="list-group">
              {
                this.state.genreArr.map((genre) => (
                  this.state.currentGenre == genre ? <li onClick={() => this.handleGenre(genre)} className="list-group-item currentGenre">{genre}</li> : <li onClick={() => this.handleGenre(genre)} className="list-group-item otherGenre">{genre}</li>
                ))
              }
            </ul>
          </div>
          <div className="col-lg-10 col-sm-12">

            <div className="input-group input-group-sm mb-3">
              <input onChange={(e) => this.handleSearch(e.target.value)} type="text" className="form-control but" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
              <input onChange={(e) => this.handleLimit(e.target.value)} type="number" className="form-control but" placeholder="Movies per page" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <div id='tableCont' className="tableCont">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i onClick={this.faSortDnPop} className="fas fa-sort-up"></i>Popularity<i onClick={this.faSortUpPop} className="fas fa-sort-down"></i></th>
                    <th scope="col"><i onClick={this.faSortDnRat} className="fas fa-sort-up"></i>Rating<i onClick={this.faSortUpRat} className="fas fa-sort-down"></i></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.filteredMov.map((mov) => (
                      <tr className='movRow' key={mov.id}>
                        <td><img style={{ width: '200px' }} src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`} /> {mov.name || mov.title}</td>
                        <td>{idConv[mov.genre_ids[0]]}</td>
                        <td>{mov.popularity}</td>
                        <td>{mov.vote_average}</td>
                        <td><div><button onClick={() => this.handleDelete(mov)} type="button" className="btn btn-danger but">Delete</button></div></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {
                  this.state.pagesArr.map((p) => (
                    p == this.state.currPage ?
                      <li key={p} onClick={() => this.updateMovWithGenreAndSearch(p)} className="page-item active" aria-current="page">
                        <a className="page-link" href="#tableCont">{p}</a>
                      </li> :
                      <li key={p} onClick={() => this.updateMovWithGenreAndSearch(p)} className="page-item "><a className="page-link but" href="#tableCont">{p}</a></li>
                  ))
                }
              </ul>
            </nav>
          </div>
        </div>
      </>
    )
  }
}
