import React from 'react';
import './App.css';
import Editable from './Editable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

  }
  componentDidMount() {
    // console.log('component is mounted', JSON.parse(myData));
  }

  handleChange = (event) => {
    this.setState({html: event.target.value});
  };
  render(){
    return (
      <div className="App py-5">
        <div>
          <input type="text" className="form-control" id="usr" />
        </div>
        <div className="table-responsive" style={{ border: '1px solid red' }}>
          <div>contenteditable</div>
          <table className="table table-bordered table-sm">
            <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Postal Code</th>
              <th>Stars</th>
              <th>Good For Kids</th>
              <th>Monday</th>
              <th>Tuesday</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><Editable html={'john'} onChange={this.handleChange}>John</Editable></td>
              <td><Editable html={'Doe'} onChange={this.handleChange}>Doe</Editable></td>
              <td>john@example.com</td>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
