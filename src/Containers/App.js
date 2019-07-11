import React from 'react';
import '../App.css';
import Pagination from '../Components/Pagination';
import Listing from '../Components/Listing';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      totalPages: 0,
      limit: 10,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);

  }

  componentWillMount() {
    const myData = localStorage.getItem('myData');
    if(!myData) {
      localStorage.setItem('myData', JSON.stringify(require('../data.json')));
    }
  }

  componentDidMount() {
    let myData = localStorage.getItem('myData');
    const { limit } = this.state;
    if(myData) {
      myData = JSON.parse(myData);
      const totalPages = Math.ceil(myData.length / limit);
      this.setState({ list: myData.slice(0, limit), totalPages });
    }
  }

  handleChange = (event) => {
    this.setState({html: event.target.value});
  };

  onPageChange(e) {
    e.preventDefault();
    let myData = localStorage.getItem('myData');
    const { limit, page, totalPages } = this.state;
    let currentPage = parseInt(e.target.innerHTML);
    if(e.target.innerHTML === 'Next' && page < totalPages) {
      currentPage = page + 1;
    } else if(e.target.innerHTML === 'Next' && page >= totalPages) {
      currentPage = totalPages;
    }

    if(e.target.innerHTML === 'Previous' && page > 1) {
      currentPage = page - 1;
    } else if(e.target.innerHTML === 'Previous' && page <= 1)  {
      currentPage = 1;
    }

    const lastIndex = limit * currentPage;
    const firstIndex = lastIndex - limit;

    if(myData) {
      myData = JSON.parse(myData);
      this.setState({ list: myData.slice(firstIndex, lastIndex), page: currentPage});
    }
  }

  render(){
    const { list, totalPages, page } = this.state;
    return (
      <div className="App p-5">
        {list ? <Listing list={list} handleChange={this.handleChange} /> : 'No Data Found' }
        {list && totalPages ? <Pagination onPageChange={this.onPageChange} page={page} totalPages={totalPages} /> : ''}
      </div>
    );
  }
}

export default App;
