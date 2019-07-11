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
      sortOrder: 'asc'
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onDelete = this.onDelete.bind(this);

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
      myData = JSON.parse(myData).sort((a, b) => b.name > a.name ? -1 : 1);
      localStorage.setItem('myData', JSON.stringify(myData));
      const totalPages = Math.ceil(myData.length / limit);
      this.setState({ list: myData.slice(0, limit), totalPages });
    }
  }

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
  onSort() {
    const { limit, page, sortOrder } = this.state;
    let myData = localStorage.getItem('myData');
    let order = sortOrder;
    if(sortOrder === 'asc') {
      myData = JSON.parse(myData).sort((a, b) => b.name > a.name ? 1 : -1);
      order = 'desc';
    } else {
      myData = JSON.parse(myData).sort((a, b) => b.name > a.name ? -1 : 1);
      order = 'asc';
    }
    localStorage.setItem('myData', JSON.stringify(myData));

    const lastIndex = limit * page;
    const firstIndex = lastIndex - limit;

    this.setState({ list: myData.slice(firstIndex, lastIndex), sortOrder: order });

  }
  onDelete(id) {
    const { limit, page } = this.state;
    if(window.confirm("Are you sure ?")) {
      let myData = JSON.parse(localStorage.getItem('myData'));
      myData = myData.filter(d => d.business_id !== id);
      localStorage.setItem('myData', JSON.stringify(myData));
      const lastIndex = limit * page;
      const firstIndex = lastIndex - limit;
      this.setState({ list: myData.slice(firstIndex, lastIndex)});
    }
  }
  render(){
    const { list, totalPages, page, sortOrder } = this.state;
    return (
      <div className="App p-5">
        {list ? <Listing list={list} onSort={() => this.onSort} sort={sortOrder} onDelete={this.onDelete} /> : 'No Data Found' }
        {list && totalPages ? <Pagination onPageChange={this.onPageChange} page={page} totalPages={totalPages} /> : ''}
      </div>
    );
  }
}

export default App;
