/**
 * @copyright 2015, Prometheus Research, LLC
 */

import React          from 'react';
import WithFormValue  from './WithFormValue';

@WithFormValue
export default class Field extends React.Component {

  static defaultProps = {
    children: <input type="text" />
  };

  constructor(props) {
    super(props);
    this.state = {dirty: false};
  }

  render() {
    let {label, children} = this.props;
    let {dirty} = this.state;
    let {value, errors, params} = this.props.formValue;
    let showErrors = dirty || params.forceShowErrors;
    children = React.cloneElement(
      React.Children.only(children),
      {value, onChange: this.onChange});
    return (
      <div onBlur={this.onBlur}>
        <label>{label}</label>
        {children}
        {showErrors && errors &&
          <div>
            {errors.map(error => <div>{error.message}</div>)}
          </div>}
      </div>
    );
  }

  onBlur = () => {
    this.setState({dirty: true});
  }

  onChange = (e) => {
    let value;
    if (e && e.target && e.target.value !== undefined) {
      e.stopPropagation();
      value = e.target.value;
      if (value === '') {
        value = undefined;
      }
    } else {
      value = e;
    }
    this.setState({dirty: true});
    this.props.formValue.set(value);
  }
}