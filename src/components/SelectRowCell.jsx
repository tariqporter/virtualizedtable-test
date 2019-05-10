const React = require('react');
const PropTypes = require('prop-types');
// const Checkbox = require('../../../common/blocks-overrides/Checkbox.jsx');
// const { isChrome } = require('../../../../../constants/clientConstants.js');
// const { isNodeVisible } = require('../../../../../util/cell');

const styles = {
  fullSize: {
    height: '100%',
    width: '100%'
  }
};

class SelectRowCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cellIncrement = this.cellIncrement.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.setRef = this.setRef.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate() {
    this.focus();
  }

  onKeyDown(e) {
    const directions = { Enter: [1, 0], Tab: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    if (directions[e.key]) {
      e.preventDefault();
      const row = directions[e.key][0] * (e.shiftKey ? -1 : 1);
      const column = directions[e.key][1] * (e.shiftKey ? -1 : 1);
      this.cellIncrement(row, column);
    }
  }

  setRef(ref) {
    this.ref = ref;
  }

  cellIncrement(row, column) {
    const { setSelectedCell, rowIndex, columnIndex } = this.props;
    const incrementCellRowIndex = rowIndex + row;
    const incrementCellColumnIndex = columnIndex + column;
    // We want to highlight the new cell after cancel edit on old cell
  //   setTimeout(() => {
  //     setSelectedCell(incrementCellRowIndex, incrementCellColumnIndex);
  //   });
  }

  focus() {
    // if (this.props.isSelected && isNodeVisible(this.ref)) {
    //   // Stop Chrome from scrolling when focusing
    //   if (isChrome()) {
    //     this.ref.select();
    //   } else {
    //     this.ref.focus();
    //   }
    // }
  }

  render() {
    const { isChecked, value, toggleSelected } = this.props;

    return (
      <div style={styles.fullSize} onClick={() => this.cellIncrement(0, 0)} role="button" tabIndex={-1}>
        <input
          type="checkbox"
          ref={this.setRef}
          name={value}
          checked={isChecked}
          onChange={toggleSelected}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

SelectRowCell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isChecked: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired,
  setSelectedCell: PropTypes.func
};

SelectRowCell.defaultProps = {
  isSelected: false,
  setSelectedCell: null
};

module.exports = SelectRowCell;
