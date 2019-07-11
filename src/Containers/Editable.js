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
  emitChange(){
    const html =  ReactDOM.findDOMNode(this).innerHTML;
    const { onChange, id } = this.props;
    console.log('html_test', html);
    onChange(id, html);

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
