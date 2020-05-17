import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from '../../validations/isEmpty';

export default class ProfileCreds extends Component {
  render() {
    const { profile } = this.props;

    const experiences = profile.experience.map((item, index) => {
      return (
        <li key={index} className="list-group-item">
          <h4>{item.company}</h4>
          <p>
            <Moment format="MMM YYYY">{item.from}</Moment>
            {item.current === true ? (
              ' - Current'
            ) : (
              <Moment format="MMM YYYY">{item.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position:</strong> {item.title}
          </p>
          {isEmpty(profile.desciption) ? null : (
            <p>
              <strong>Description:</strong> {item.description}
            </p>
          )}
        </li>
      );
    });

    const educations = profile.education.map((item, index) => {
      return (
        <li key={index} className="list-group-item">
          <h4>{item.title}</h4>
          <p>
            <Moment format="MMM YYYY">{item.from}</Moment> -{' '}
            {item.current === true ? (
              'Current'
            ) : (
              <Moment format="MMM YYYY">{item.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree: </strong>
            {item.degree}
          </p>
          <p>
            <strong>Field Of Study: </strong>
            {item.fieldofstudy}
          </p>
          {isEmpty(item.description) ? null : (
            <p>
              <strong>Description:</strong> {item.description}
            </p>
          )}
        </li>
      );
    });
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {isEmpty(profile.experience) ? 'No experience yet.' : experiences}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {isEmpty(profile.education) ? 'No education yet.' : educations}
          </ul>
        </div>
      </div>
    );
  }
}
