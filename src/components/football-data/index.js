import React, { Component } from "react";
import "./index.css";
const classNames = require("classnames");

export default class FootballMatchesData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      matches: [],
      totalMatches: null,
    };
  }
  componentDidMount() {
    this.setState({
      initial : true
    })
  }
  fetchData() {
    console.log(this.state.selectedYear);
    fetch(
      `https://jsonmock.hackerrank.com/api/football_competitions?year=${this.state.selectedYear}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            totalMatches: result.total,
            matches: result.data,
            initial: false
          });
        },
        (error) => {}
      );
  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState(
      {
        selectedYear: year,
      },
      () => this.fetchData()
    );
  };

  render() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li
                className={classNames({
                  "sidebar-item": true,
                  active: this.state.selectedYear === year,
                })}
                onClick={this.onClick(year)}
                key={year}
              >
                <a>{year}</a>
              </li>
            );
          })}
        </ul>

        <section className="content">
          <section>
            <div className="total-matches" data-testid="total-matches">
              {this.state.totalMatches > 0
                ? "Total matches: " + this.state.totalMatches
                : null}
            </div>

            <ul className="mr-20 matches styled" data-testid="match-list">
              {this.state.matches.length > 0 ? (
                this.state.matches.map((el, index) => {
                  return (
                    <li key={index} className="slide-up-fade-in">
                      Match {el.name} won by {el.winner}
                    </li>
                  );
                })
              ) : (
                  <div data-testid="no-result">{!this.state.initial ? "No Results Found" : null}</div>
              )}
            </ul>
          </section>

          <div
            data-testid="no-result"
            className="slide-up-fade-in no-result"
          ></div>
        </section>
      </div>
    );
  }
}
