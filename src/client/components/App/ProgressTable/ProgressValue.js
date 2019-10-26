import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { Badge, Popover, PopoverBody } from 'reactstrap';

const ProgressValue = ({
    value,
    body,
    color,
    index,
    type,
    customClassName,
}) => {
    const [open, setOpen] = useState(false);
    const hidePopover = useCallback(() => setOpen(false), [open, setOpen]);
    const showPopover = useCallback(() => setOpen(true), [open, setOpen]);

    return (
        <span className={customClassName}>
            <Badge
                onMouseEnter={showPopover}
                onMouseLeave={hidePopover}
                id={`progressValue-${index}-${type}`}
                color={color}
                className="progress-badge"
            >
                {value}
            </Badge>
            {body && (
                <Popover
                    className="pd-10"
                    placement="right"
                    isOpen={open}
                    target={`progressValue-${index}-${type}`}
                >
                    <PopoverBody>{body}</PopoverBody>
                </Popover>
            )}
        </span>
    );
};

ProgressValue.propTypes = {
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    body: propTypes.element,
    color: propTypes.string,
    index: propTypes.number,
    type: propTypes.string,
    customClassName: propTypes.any,
};

export default ProgressValue;
