import React from 'react';


export default class TestCell extends React.PureComponent {
  setCellRef = (ref) => {
    this.cellRef = ref;
  }

  render() {
    const { value } = this.props;
    return (
      <div className="sourceCell_parent" role="button" tabIndex={-1}>
        {
        }
      </div>
    );
  }
}