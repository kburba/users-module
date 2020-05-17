import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteEducation } from '../../store/actions/profileActions';

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    return (
      <div>
        {this.props.educations.length === 0 ? (
          'No education.'
        ) : (
          <div>
            <h2>Education Credentials</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>School</th>
                  <th>Degree</th>
                  <th>Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.educations.map((education) => {
                  return (
                    <tr key={education._id}>
                      <td>{education.school}</td>
                      <td>{education.degree}</td>
                      <td>
                        <Moment format="YYYY-MM-DD">{education.from}</Moment> -{' '}
                        {education.current === true ? (
                          'Current'
                        ) : (
                          <Moment format="YYYY/MM/DD">{education.to}</Moment>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.onDeleteClick(education._id)}
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
        )}
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: propTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
