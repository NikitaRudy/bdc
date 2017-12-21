import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Badge, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class ProgressValue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false,
        };

        this.togglePopover = this.togglePopover.bind(this);
    }

    togglePopover() {
        this.setState({ popoverOpen: !this.state.popoverOpen });
    }

    render() {
        const {
            value,
            body,
            color,
            index,
            type,
        } = this.props;
        return (
            <span>
                <Badge
                    onMouseEnter={ this.togglePopover }
                    onMouseLeave={ this.togglePopover }
                    id={ `progressValue-${index}-${type}` }
                    color={ color }
                    className="progress-badge"
                >{ value }
                </Badge>
                { body ?
                    <Popover
                        placement="top"
                        isOpen={ this.state.popoverOpen }
                        target={ `progressValue-${index}-${type}` }
                        toggle={ this.togglePopover }
                    >
                        <PopoverBody>{ body }</PopoverBody>
                    </Popover>
                    :
                    null
                }
            </span>
        );
    }
}

ProgressValue.propTypes = {
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    body: propTypes.element,
    color: propTypes.string,
    index: propTypes.number,
    type: propTypes.string,
};

export default ProgressValue;
