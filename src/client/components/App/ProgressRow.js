import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Badge } from 'reactstrap';

class ProgressRow extends Component {
    formatProgressString(progress, prev, current) {
        if (progress === 0) {
            return <Badge color="primary" >0</Badge>;
        }

        const progressJsx = progress > 0
            ? <Badge color="success" >+{ progress }</Badge>
            : <Badge color="danger">{ progress }</Badge>;
        const fromTostring = `from ${prev} to ${current}`;
        return (
            <div>
                { progressJsx }
                <div>{ fromTostring }</div>
            </div>
        );
    }

    render() {
        const {
            nickName,
            leaderboardsProgress,
            leaderboardsPrevPosition,
            leaderboardsCurrentPosition,
            bdcProgress,
            bdcPrevPosition,
            bdcCurrentPosition,
            index,
        } = this.props;
        return (
            <tr key={ `${nickName}-${leaderboardsProgress}` }>
                <th scope="row">{ index + 1 }</th>
                <td>{ nickName }</td>
                <td>
                    { this.formatProgressString(leaderboardsProgress, leaderboardsPrevPosition, leaderboardsCurrentPosition) }
                </td>
                <td>
                    { this.formatProgressString(bdcProgress, bdcPrevPosition, bdcCurrentPosition) }
                </td>
            </tr>
        );
    }
}

ProgressRow.propTypes = {
    nickName: propTypes.string,
    leaderboardsProgress: propTypes.number,
    leaderboardsPrevPosition: propTypes.number,
    leaderboardsCurrentPosition: propTypes.number,
    bdcProgress: propTypes.number,
    bdcPrevPosition: propTypes.number,
    bdcCurrentPosition: propTypes.number,
    index: propTypes.number,
};

export default ProgressRow;
