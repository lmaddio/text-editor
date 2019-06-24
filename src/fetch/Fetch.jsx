import React, { Component } from 'react';
import PropTypes from 'prop-types';

const AbortController = window.AbortController;

const initialState = {
  fetching: false,
  response: null,
  error: null,
};

class Fetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      fetching: Boolean(props.url),
    };
    this.notApplyUpdate = false;
    this.controller = null;
    this.fetch = this.fetch.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {  fetching, response, error } = this.state;
    return nextProps.url !== this.props.url
      || nextState.fetching !== fetching
      || nextState.response !== response
      || nextState.error !== error;
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;
    const { fetching } = this.state;
    if (prevProps.url !== url) {
      if (fetching) {
        this.controller.abort();
      }
      if (url) {
        this.fetch();
      }
    }
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

    this.controller = new AbortController();

    this.setState({ ...initialState, fetching: true }, () =>
      service(url, Object.assign({}, options, { signal: this.controller.signal }))
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
