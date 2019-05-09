import React from 'react';
import PropTypes from 'prop-types';
import { FILTER_SOURCE } from '../constants';

// const isNodeVisible = (node) => {
//   if (!node) return false;
//   const { top, left, bottom, right } = node.getBoundingClientRect();
//   return top >= 0 && left >= 0 && bottom <= window.innerHeight && right <= window.innerWidth;
// };

export default class SourceCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cellIncrement = this.cellIncrement.bind(this);
    this.copyPropertyToTeam = this.copyPropertyToTeam.bind(this);
    this.setCellRef = this.setRef.bind(this, 'cellRef');
    this.onKeyDown = this.onKeyDown.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate() {
    this.focus();
  }

  onKeyDown(e) {
    const directions = { Enter: [1, 0], Tab: [0, 1] };
    if (directions[e.key]) {
      e.preventDefault();
      const row = directions[e.key][0] * (e.shiftKey ? -1 : 1);
      const column = directions[e.key][1] * (e.shiftKey ? -1 : 1);
      this.cellIncrement(row, column);
    }
  }

  setRef(name, ref) {
    if (ref) {
      this[name] = ref;
    }
  }

  cellIncrement(row, column) {
    const { setSelectedCell, rowIndex, columnIndex } = this.props;
    const incrementCellRowIndex = rowIndex + row;
    const incrementCellColumnIndex = columnIndex + column;
    // We want to highlight the new cell after cancel edit on old cell
    setTimeout(() => {
      setSelectedCell(incrementCellRowIndex, incrementCellColumnIndex);
    });
  }

  copyPropertyToTeam() {
    const { id, copyPropertyToTeam } = this.props;
    // TODO - Add team to constants. Handle isEditing in PropertyTable to make it reusable
    copyPropertyToTeam(id);
  }

  focus() {
    // const { isSelected } = this.props;
    // if (isSelected && isNodeVisible(this.cellRef)) { // Don't focus the cell if it is not visible to prevent shifting of viewport
    //   this.cellRef.focus();
    // }
  }

  render() {
    const { value } = this.props;
    return (
      <div className="sourceCell_parent" role="button" tabIndex={-1}>
        {
          <div
            ref={this.setCellRef}
            onClick={() => this.cellIncrement(0, 0)}
            onKeyDown={this.onKeyDown}
            role="button"
            tabIndex={-1}
          >
            {
              value === FILTER_SOURCE.CBRE &&
              <div className="sourceCell_cbreData">
                <button type="button" className="sourceCell_copyButton" onClick={this.copyPropertyToTeam}>
                  <div className="sourceCell_icon sourceCell_icon_cbreData icon-globe" />
                  <div className="sourceCell_copyButtonText">
                    <div>CBRE</div>
                    <div className="sourceCell_copyButtonLink">Copy to Team</div>
                  </div>
                </button>
              </div>
            }
            {
              value === FILTER_SOURCE.TEAM &&
              <div className="sourceCell_parent">
                <div className="sourceCell_icon icon-briefcase" />
                <div>Team</div>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

SourceCell.propTypes = {
  id: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  copyPropertyToTeam: PropTypes.func,
  setSelectedCell: PropTypes.func
};

SourceCell.defaultProps = {
  isSelected: false,
  copyPropertyToTeam: () => { },
  setSelectedCell: () => { }
};
