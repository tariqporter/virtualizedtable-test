import React from 'react';
import headersJson from '../src/headers.json';
import rowsJson from '../src/rows.json';
import './App.scss';
// import { Table, Column } from 'react-virtualized';
// import AutoSizer from './components/react-virtualized/AutoSizer/AutoSizer'
import { FILTER_SOURCE, CELL_TYPE } from './constants';
import SourceCell from './components/SourceCell';
import SelectRowCell from './components/SelectRowCell';
import VirtualizedTable from './components/VirtualizedTable';

const { AutoSizer } = require('./components/react-virtualized');

class App extends React.PureComponent {
  state = {
    rows: rowsJson,
    headers: headersJson,
    totalWidth: headersJson.reduce((acc, x) => acc + x.width, 0),
    selectedCellRowIndex: 0,
    selectedCellColumnIndex: 0,
    selectedRowIds: [],
    setSelectedCell: () => { },
    copyPropertyToTeam: () => { }
  };

  render() {
    const { rows, headers, totalWidth, selectedCellRowIndex, selectedCellColumnIndex, selectedRowIds, setSelectedCell, copyPropertyToTeam } = this.state;
    return (
      <div className="App">
        <AutoSizer>
          {({ width, height }) => {
            return (
              <VirtualizedTable
                columnWidth={({ columnIndex }) => headers[columnIndex].width}
                rowCount={rows.length}
                rowHeight={42}
                height={height - 2}
                rows={rows}
                headers={headers}
                rowKeyGetter={({ rowIndex }) => rows[rowIndex].id}
                columnKeyGetter={({ columnIndex }) => headers[columnIndex].id}
                width={totalWidth || width}
              >
                {({ rowIndex, columnIndex, dataKey, rows: data }) => {
                  const rowData = data[rowIndex];
                  const cellData = rowData[dataKey];
                  const isSelected = rowIndex === selectedCellRowIndex && columnIndex === selectedCellColumnIndex;
                  switch (cellData.type) {
                    case CELL_TYPE.SELECT_ROW: {
                      const isChecked = selectedRowIds.includes(cellData.value);
                      return (<SelectRowCell
                        key={rowData.id}
                        value={cellData.value}
                        isChecked={isChecked}
                        isSelected={isSelected}
                        toggleSelected={() => { }}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        setSelectedCell={setSelectedCell}
                      />);
                    }
                    case CELL_TYPE.SOURCE: {
                      const value = cellData.value === 'edp' ? 'CBRE' : 'TEAM';
                      return (<SourceCell
                        key={rowData.id}
                        id={rowData.id}
                        value={value}
                        copyPropertyToTeam={copyPropertyToTeam}
                        isSelected={isSelected}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        setSelectedCell={setSelectedCell}
                      />);
                    }
                    // case CELL_TYPE.VALUE: {
                    //   let PopperComponent = null;
                    //   let align = 'center';
                    //   // if (cellData.type === CELL_TYPE.MIN_MAX) {
                    //   //   PopperComponent = MinMaxPopper;
                    //   // } else if (cellData.type === CELL_TYPE.NAME_ADDRESS) {
                    //   //   PopperComponent = AddressPopper;
                    //   //   align = 'left';
                    //   // } else if (getUnit(cellData.id) === UNIT_TYPES.BOOL) {
                    //   //   PopperComponent = BoolPopper;
                    //   // }

                    //   return (<ValueCell
                    //     key={rowData.id}
                    //     id={rowData.id}
                    //     dataKey={dataKey}
                    //     value={cellData.value}
                    //     editValue={cellData.editValue}
                    //     displayValue={cellData.displayValue}
                    //     align={align}
                    //     popper={PopperComponent}
                    //     isEditing={isEditing && isSelected}
                    //     isSelected={isSelected}
                    //     onEdit={editCell}
                    //     onSave={saveCell}
                    //     rowIndex={rowIndex}
                    //     columnIndex={columnIndex}
                    //     setSelectedCell={setSelectedCell}
                    //     cancelCellEdit={cancelCellEdit}
                    //     cancelNewProperty={cancelNewProperty}
                    //   />);
                    // }
                    default: {
                      // console.log()
                      return (
                        <div>
                          <div>{cellData.displayValue.main}</div>
                        </div>
                      );
                    }
                  }
                }}
              </VirtualizedTable>
            );
          }}
        </AutoSizer>
      </div>
    );
  }
}

export default App;
