import React from "react";

class Form extends React.Component {
  state = { term: "" };

  handleChange = (e) => {
    this.setState({ term: e.target.value });
  };
  handleSubmit = (e) => {
    this.props.onSubmit(e, this.state.term);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.term}
            type="text"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
