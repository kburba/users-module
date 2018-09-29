import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileActions";
import propTypes from "prop-types";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    return (
      <div>
        <h2>Experience Credentials</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.experiences.map(experience => {
              return (
                <tr key={experience._id}>
                  <td>{experience.company}</td>
                  <td>{experience.title}</td>
                  <td>
                    <Moment format="YYYY-MM-DD">{experience.from}</Moment> -{" "}
                    {experience.current === true ? (
                      "Current"
                    ) : (
                      <Moment format="YYYY/MM/DD">{experience.to}</Moment>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.onDeleteClick(experience._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: propTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
