import React from 'react';
import PropTypes from 'prop-types';

export default function connect(tokens, WrappedComponent, staticProps, mapper) {

  if (!Array.isArray(tokens)) {
    tokens = [tokens];
  }

  mapper = mapper || function (state) {
    let props = {};
    state.forEach(stateItem => Object.assign(props, stateItem));
    return props;
  };

  return class StateConnector extends React.Component {

    constructor(context) {
      super();
      this.mounted = false;
      this.stateProps = {};
    }

    componentWillMount() {
      this.externalStateConnection = this.context.bus.connectToState(tokens, this.setExternalState);
      this.externalStateConnection();
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
      this.context.bus.disconnectFromState(this.externalStateConnection);
    }

    setExternalState = (state) => {
      this.stateProps = mapper(state);
      if (this.mounted) {
        this.forceUpdate();
      }
    };

    dispatch = (event, data) => {
      this.context.bus.dispatch(event, data);
    };

    render() {
      return <WrappedComponent {...this.stateProps} {...staticProps} dispatch={this.dispatch} />
    }

    static contextTypes = {
      bus: PropTypes.object
    };
  }
}


