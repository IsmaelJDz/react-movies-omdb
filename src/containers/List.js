import React from "react";

import Card from "../components/Card/Card";

//! this url is only local test
//const URL = "../../assets/data.json";

//* this url is API ombdapi
const API = process.env.API;

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], searchTerm: "", error: "", loading: true };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(`${API}&s=batman`);
    const responseJSON = await response.json();
    this.setState({ data: responseJSON.Search, loading: false });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.state.searchTerm) {
      return this.setState({ error: "Please write a valid text" });
    }

    const response = await fetch(`${API}&s=${this.state.searchTerm}`);
    const getData = await response.json();

    if (!getData.Search) {
      return this.setState({ error: "There are no results" });
    }

    this.setState({ data: getData.Search, error: "", searchTerm: "" });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div className="row">
          <div className="col-md-4 offset-md-4 p-4">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="search"
                onChange={e => this.setState({ searchTerm: e.target.value })}
                autoFocus
                value={this.state.searchTerm}
              />
            </form>
            <p>{this.state.error ? this.state.error : ""}</p>
          </div>
        </div>
        <div className="row">
          {data.map(movie => (
            <Card movie={movie} key={movie.imdbID} />
          ))}
        </div>
      </>
    );
  }
}
