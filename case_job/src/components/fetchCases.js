import React from "react";

export default class FetchCases extends React.Component {
  state = {
    loading: true,
    person: null
  };

  async componentDidMount() {
    const url = "https://611cf8c67d273a0017e2f550.mockapi.io/api/v1/cases";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ case: data[1], loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.case) {
      return <div>veri alınamadı</div>;
    }

    return (
      <div>
        <div>{this.state.case.accountType}</div>
        <div>{this.state.case.displayName}</div>
        <div>{this.state.case.role}</div>
        <div>{this.state.case.price}</div>
      </div>
    );
  }
}