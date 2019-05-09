import React from 'react';
import headersJson from '../src/headers.json';
import rowsJson from '../src/rows.json';
import './App.scss';
import { Table, Column } from 'react-virtualized';
import AutoSizer from './components/react-virtualized/AutoSizer/AutoSizer'
import { FILTER_SOURCE, CELL_TYPE } from './constants';
import SourceCell from './components/SourceCell';

// const reactVirtualized = require('./components/react-virtualized');

class CellRenderer extends React.PureComponent {
  render() {
    const { cellData, rowIndex, rowData, columnIndex, dataKey } = this.props;
    // const isSelected = rowIndex === propertyTable.props.selectedCellRowIndex && columnIndex === propertyTable.props.selectedCellColumnIndex;
    const isSelected = false;
    let Component = null;
    switch (cellData.type) {
      // case CELL_TYPE.SOURCE: {
      //   const value = cellData.value === 'edp' ? FILTER_SOURCE.CBRE : FILTER_SOURCE.TEAM;
      //   Component = (<SourceCell
      //     key={rowData.id}
      //     id={rowData.id}
      //     value={value}
      //     copyPropertyToTeam={() => {}}
      //     isSelected={isSelected}
      //     rowIndex={rowIndex}
      //     columnIndex={columnIndex}
      //     setSelectedCell={() => {}}
      //   />);
      //   break;
      // }
      // case CELL_TYPE.NAME_ADDRESS:
      // case CELL_TYPE.MIN_MAX:
      // case CELL_TYPE.VALUE: {
      //   let PopperComponent = null;
      //   let align = 'center';
      //   if (cellData.type === CELL_TYPE.MIN_MAX) {
      //     PopperComponent = MinMaxPopper;
      //   } else if (cellData.type === CELL_TYPE.NAME_ADDRESS) {
      //     PopperComponent = AddressPopper;
      //     align = 'left';
      //   } else if (getUnit(cellData.id) === UNIT_TYPES.BOOL) {
      //     PopperComponent = BoolPopper;
      //   }

      //   Component = (<ValueCell
      //     key={rowData.id}
      //     id={rowData.id}
      //     dataKey={dataKey}
      //     value={cellData.value}
      //     editValue={cellData.editValue}
      //     displayValue={cellData.displayValue}
      //     align={align}
      //     popper={PopperComponent}
      //     isEditing={propertyTable.props.isEditing && isSelected}
      //     isSelected={isSelected}
      //     onEdit={propertyTable.props.editCell}
      //     onSave={propertyTable.props.saveCell}
      //     rowIndex={rowIndex}
      //     columnIndex={columnIndex}
      //     setSelectedCell={propertyTable.props.setSelectedCell}
      //     cancelCellEdit={propertyTable.props.cancelCellEdit}
      //     cancelNewProperty={propertyTable.props.cancelNewProperty}
      //   />);
      //   break;
      // }
      // case CELL_TYPE.SELECT_ROW: {
      //   const isChecked = propertyTable.props.selectedRowIds.includes(cellData.value);
      //   Component = (<SelectRowCell
      //     key={rowData.id}
      //     value={cellData.value}
      //     isChecked={isChecked}
      //     isSelected={isSelected}
      //     toggleSelected={propertyTable.props.toggleRowSelected}
      //     rowIndex={rowIndex}
      //     columnIndex={columnIndex}
      //     setSelectedCell={propertyTable.props.setSelectedCell}
      //   />);
      //   break;
      // }
      // case CELL_TYPE.PHOTO: {
      //   Component = (<PhotoCell
      //     key={rowData.id}
      //     id={rowData.id}
      //     dataKey={dataKey}
      //     value={cellData.value}
      //     isSelected={isSelected}
      //     isEditing={propertyTable.props.isEditing && isSelected}
      //     uploadPhoto={propertyTable.props.uploadPhoto}
      //     onSave={propertyTable.props.saveCell}
      //     rowIndex={rowIndex}
      //     columnIndex={columnIndex}
      //     setSelectedCell={propertyTable.props.setSelectedCell}
      //   />);
      //   break;
      // }
      default: {
        Component = <div>{JSON.stringify(cellData.value)}</div>;
        break;
      }
    }

    return (
      <div>
        {Component}
      </div>
    );
  }
}

class App extends React.PureComponent {
  state = {
    rows: rowsJson,
    headers: headersJson,
    totalWidth: headersJson.reduce((acc, x) => acc + x.width, 0)
  };

  // componentDidMount() {

  // }

  render() {
    const { rows, headers, totalWidth } = this.state;
    return (
      <div className="App">
        <AutoSizer>
          {({ width, height }) => {
            console.log(width, height);
            return (
              <Table
                width={totalWidth}
                height={height - 20}
                headerHeight={42}
                rowHeight={42}
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
              >
                {headers.map(header => (
                  <Column
                    key={header.id}
                    dataKey={header.id}
                    width={header.width}
                    label={header.value}
                    // headerRenderer={this.headerRenderer}
                    cellRenderer={context => <CellRenderer {...context} />}
                  />
                ))}
              </Table>);
          }}
        </AutoSizer>
      </div>
    );
  }
}

export default App;
