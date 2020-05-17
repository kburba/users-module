import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import isEmpty from '../../validations/isEmpty';

const ProfileItem = (props) => {
  const { profile } = props;
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img
            className="rounded-circle"
            src={profile.user.avatar}
            alt={profile.user.name}
          />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status}{' '}
            {isEmpty(profile.company) ? null : `at ${profile.company}`}
          </p>
          <p>{isEmpty(profile.location) ? null : profile.location}</p>
          <Link
            to={`/profile/handle/${profile.handle}`}
            className="btn btn-info"
          >
            View Profile
          </Link>
        </div>
        {isEmpty(profile.skills) ? (
          'No skills'
        ) : (
          <div className="col-md-4 d-none d-lg-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.map((skill, index) => {
                return (
                  <li key={index} className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {skill}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: propTypes.object.isRequired,
};

export default ProfileItem;
