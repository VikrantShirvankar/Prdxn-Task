import React from 'react';
import ReactDOM from 'react-dom';

export default class ContentEditable extends React.Component {
  constructor(props) {
    super(props);
    this.emitChange = this.emitChange.bind(this);
  }
  shouldComponentUpdate(nextProps){
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }
  emitChange(e){
    const html =  ReactDOM.findDOMNode(this).innerHTML;
    const { field, id, tag } = this.props;
    let myData = localStorage.getItem('myData');
    if(myData) {
      myData = JSON.parse(myData);
      const index = myData.findIndex((data) => data.business_id === id);
      let data = null;
      if(tag) {
        data = [...myData.slice(0, index), { ...myData[index], [tag]: {...myData[index][tag], [field]: html} }, ...myData.slice(index + 1)];
      } else {
        data = [...myData.slice(0, index), { ...myData[index], [field]: html }, ...myData.slice(index + 1)];
      }
      localStorage.setItem('myData', JSON.stringify(data));
    }
  }
  render(){
    return (
      <div
        // onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.html}}>
      </div>
    );
  };
};
