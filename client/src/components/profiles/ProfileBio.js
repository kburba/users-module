import React, { Component } from "react";
import isEmpty from "../../validations/isEmpty";

export default class ProfileBio extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {isEmpty(profile.bio) ? null : (
              <div>
                <h3 className="text-center text-info">
                  {profile.user.name} bio
                </h3>
                <p className="lead">{profile.bio}</p>
              </div>
            )}
            {isEmpty(profile.skills) ? null : (
              <div>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {profile.skills.map((skill, index) => {
                      return (
                        <div key={index} className="p-3">
                          <i className="fa fa-check" />
                          {skill}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
