import React, { Component } from 'react';
import propTypes from 'prop-types';

import ProgressValue from './ProgressValue';

class ProgressRow extends Component {
    getProgressValue(progress, prev, current, index, type) {
        let badgeProps = {
            index,
            type,
            body: (
                <div>
                    <div>Previous: { prev }</div>
                    <div>Current: { current }</div>
                </div>
            ),
        };
        const positive = {
            color: 'success',
            value: `+${progress}`,
        };
        const negative = {
            color: 'danger',
            value: progress,
        };
        const zero = {
            color: 'primary',
            value: progress,
            body: null,
        };

        switch (true) {
            case progress === 0:
                badgeProps = { ...badgeProps, ...zero };
                break;
            case progress > 0:
                badgeProps = { ...badgeProps, ...positive };
                break;
            case progress < 0:
                badgeProps = { ...badgeProps, ...negative };
                break;
            default:
        }

        return <ProgressValue { ...badgeProps } />;

    }

    render() {
        const {
            nickName,
            leaderboardsProgress: lbProg,
            leaderboardsPrevPosition: lbPrevPos,
            leaderboardsCurrentPosition: lbCurPos,
            bdcProgress: bdcProg,
            bdcPrevPosition: bdcPrevPos,
            bdcCurrentPosition: bdcCurPos,
            index,
        } = this.props;
        return (
            <tr key={ `${nickName}-${lbProg}` }>
                <th scope="row">{ index + 1 }</th>
                <td>{ nickName }</td>
                <td>
                    { this.getProgressValue(lbProg, lbPrevPos, lbCurPos, index, 'lb') }
                </td>
                <td>
                    { this.getProgressValue(bdcProg, bdcPrevPos, bdcCurPos, index, 'bdc') }
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
