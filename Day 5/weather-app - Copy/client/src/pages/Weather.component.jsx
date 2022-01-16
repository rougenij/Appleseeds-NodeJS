import React from "react";
import axios from "axios";
import weatherAPI from "../api/weatherAPI";
import Form from "../components/Form.component";

class Weather extends React.Component {
  state = { data: null, loading: false, errorMsg: "" };
  onSubmit = async (e, value) => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const fetch = await weatherAPI.get(`/weather?address=${value}`);
      this.setState({ data: fetch.data, loading: false });
    } catch (e) {
      this.setState({ errorMsg: e.response.data.error, loading: false });
    }
  };
  render() {
    const renderWeather = () => {
      return (
        <>
          <h2>{this.state.data.location}</h2>
          <h3>{this.state.data.forecast}</h3>
        </>
      );
    };
    return (
      <div>
        <h1> Welcome to my weather App</h1>
        <Form onSubmit={this.onSubmit}></Form>
        {this.state.loading && <h1>LOADING...</h1>}
        {this.state.data && renderWeather()}
        <p>{this.state.errorMsg}</p>
      </div>
    );
  }
}
export default Weather;
