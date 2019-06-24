import React, { Component } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  fetching: false,
  response: null,
  error: null,
};

class Fetch extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.notApplyUpdate = false;
    this.fetch = this.fetch.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {  fetching, response, error } = this.state;
    return nextState.fetching !== fetching
      || nextState.response !== response
      || nextState.error !== error;
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.notApplyUpdate = true;
  }

  async onSuccess(response) {
    let data = null;
    try {
      if (response && response.ok) {
        data = await this.props.onSuccess(response);
      }
    } catch (error) {
      this.onError(error.message);
    } finally {
      if (!this.notApplyUpdate) {
        this.setState({ response: data, fetching: false });
      }
    }
  }

  onError(error = 'There was an error') {
    console.warn(error);
    this.setState({ error, fetching: false });
  }

  fetch() {
    const { url, options, service } = this.props;
    // fetch needs an url
    if (service === fetch && !url) return ;

    this.setState({ ...initialState, fetching: true }, () =>
      service(url, options)
        .then(this.onSuccess)
        .catch(this.onError)
    );
  }

  render() {
    const { children } = this.props;
    const { fetching, response, error } = this.state;
    const fetchData = { fetching, data: response, error };
    return React.cloneElement(children, { fetchData });
  }
}

Fetch.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
  options: PropTypes.shape({
    method: PropTypes.string.isRequired,
  }),
  service: PropTypes.func,
  onSuccess: PropTypes.func,
};

Fetch.defaultProps = {
  options: {
    method: 'GET',
  },
  url: '',
  service: fetch,
  onSuccess: (arg) => arg,
};

export default Fetch;
