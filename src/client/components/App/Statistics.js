import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, ListGroupItem, ListGroup, Progress } from 'reactstrap';

import { requestStatistics } from '../../actions/Statistics.actions';

class Statistics extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestStatistics();
    }

    render() {
        const {
            departed,
            newcomers,
            percentage,
            bdcPlayersCount,
            lbPlayersCount,
        } = this.props;
        return (
            <section>
                <Alert color="success">
                    <h4>Newcomers</h4>
                    <ListGroup>
                        { newcomers.length ? newcomers.map(cur => (
                            <ListGroupItem key={ cur.nickName }>
                                <span>{ cur.nickName }</span><span className="ml-auto">{ cur.rank }</span>
                            </ListGroupItem>
                        )) : 'Noone' }
                    </ListGroup>
                </Alert>
                <Alert color="danger">
                    <h4>Departed</h4>
                    <ListGroup>
                        { departed.length ? departed.map(cur => (
                            <ListGroupItem key={ cur.nickName }>
                                { cur.nickName }
                            </ListGroupItem>
                        )) : 'Noone' }
                    </ListGroup>
                </Alert>
                <div>
                    <h3>Belarus players percentage in Leaderboards</h3>
                    <div>{ bdcPlayersCount }/{ lbPlayersCount }</div>
                    <div className="text-center">{ percentage }%</div>
                    <Progress value={ percentage } />
                </div>
            </section>
        );
    }
}

Statistics.propTypes = {
    newcomers: propTypes.array,
    departed: propTypes.array,
    percentage: propTypes.number,
    lbPlayersCount: propTypes.number,
    bdcPlayersCount: propTypes.number,
    requestStatistics: propTypes.func,
};

export default connect(
    state => ({
        newcomers: state.Statistics.newcomers,
        departed: state.Statistics.departed,
        percentage: state.Statistics.percentage,
        lbPlayersCount: state.Statistics.lbPlayersCount,
        bdcPlayersCount: state.Statistics.bdcPlayersCount,
    }),
    { requestStatistics },
)(Statistics);
