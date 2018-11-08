import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateY(-100vh)',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '9999',
    willChange: 'transform'
};

const transitionStyles = {
    entering: { transform: 'translateY(-100vh)' },
    entered: { transform: 'translateY(0)' },
    exited: {
        display: 'none'
    }
};

const Transform = ({ in: inProp, children, unmountOnExit = true }) => (
    <Transition in={inProp} timeout={duration} unmountOnExit={unmountOnExit}>
        {(state) => (
            <div
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}
            >
                {children}
            </div>
        )}
    </Transition>
);
export default Transform;
