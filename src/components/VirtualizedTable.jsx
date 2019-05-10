const React = require('react');
const PropTypes = require('prop-types');

class VirtualizedTable extends React.PureComponent {
  state = {
    offset: 0
  };

  setGridRef = (ref) => {
    this.gridRef = ref;
  };

  setInnerGridRef = (ref) => {
    this.innerGridRef = ref;
  };

  getOffset = () => {
    if (this.gridRef && this.innerGridRef) {
      const rect1 = this.gridRef.getBoundingClientRect();
      const rect2 = this.innerGridRef.getBoundingClientRect();
      this.setState({ offset: Math.ceil(rect1.top - rect2.top) });
    }
  };

  render() {
    const {
      children,
      rows,
      headers,
      // headerGetter,
      rowKeyGetter,
      columnKeyGetter,
      rowHeight,
      columnWidth,
      width,
      height
    } = this.props;
    const { offset } = this.state;
    const startIndex = Math.floor(offset / rowHeight);
    const visibleRowCount = Math.ceil((2 * height) / rowHeight);
    this.visibleRows = rows.slice(
      Math.max(0, startIndex - 5),
      startIndex + visibleRowCount
    );
    this.items = this.visibleRows.map((row, rowIndex) => {
      rowIndex += startIndex;
      const top = rowIndex * rowHeight;
      return (
        <div
          key={rowKeyGetter({ rowIndex })}
          className="virtualizedTable_row"
          style={{ position: 'absolute', top }}
        >
          {headers.map((header, columnIndex) => {
            const dataKey = columnKeyGetter({ columnIndex });
            return (
              <div
                className="virtualizedTable_cell"
                key={dataKey}
                style={{ width: columnWidth({ columnIndex }) }}
              >
                {children({
                  rowIndex,
                  columnIndex,
                  dataKey,
                  rows
                })}
              </div>
            );
          })}
        </div>
      );
    });
    return (
      <div
        className="virtualizedTable_grid"
        ref={this.setGridRef}
        onScroll={this.getOffset}
        style={{ width, height }}
      >
        <div
          ref={this.setInnerGridRef}
          className="virtualizedTable_innerGrid"
          style={{ height: rows.length * rowHeight }}
        >
          {this.items}
        </div>
      </div>
    );
  }
}

VirtualizedTable.propTypes = {
  children: PropTypes.func.isRequired,
  rows: PropTypes.any.isRequired,
  headers: PropTypes.any.isRequired,
  // headerGetter: PropTypes.func.isRequired,
  rowKeyGetter: PropTypes.func.isRequired,
  columnKeyGetter: PropTypes.func.isRequired,
  rowHeight: PropTypes.number.isRequired,
  columnWidth: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

module.exports = VirtualizedTable;


// class App extends React.PureComponent {
//   state = {
//     headers: [
//       { id: "A", width: 200 },
//       { id: "B", width: 200 },
//       { id: "C", width: 200 },
//       { id: "D", width: 200 },
//       { id: "E", width: 200 },
//       { id: "F", width: 200 },
//       { id: "G", width: 200 }
//     ]
//   };

//   componentWillMount() {
//     const row = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7 };
//     const rows = [];
//     for (let i = 0; i < 500; i++) {
//       const row2 = { id: i, ...row };
//       rows.push(row2);
//     }
//     this.setState({ rows });
//   }

//   render() {
//     const { rows, headers } = this.state;
//     return (
//       <VirtualizedTable
//         columnWidth={() => 200}
//         rowCount={rows.length}
//         rowHeight={42}
//         height={200}
//         rows={rows}
//         headers={headers}
//         rowKeyGetter={({ rowIndex }) => rows[rowIndex].id}
//         headerGetter={({ headerIndex }) => headers[headerIndex].id}
//         width={400}
//       >
//         {({ rowIndex, dataKey, style, rows }) => {
//           const row = rows[rowIndex];
//           const value = row[dataKey];
//           // console.log(rows, rowIndex, dataKey);
//           return (
//             <div className="row" style={style}>
//               {value}
//             </div>
//           );
//         }}
//       </VirtualizedTable>
//     );
//   }
// }

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);
