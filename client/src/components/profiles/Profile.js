import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

import ProfileHead from "./ProfileHead";
import ProfileBio from "./ProfileBio";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";

import { getProfileByHandle } from "../../store/actions/profileActions";
import isEmpty from "../../validations/isEmpty";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfileByHandle(this.props.match.params.handle);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.profile.profile === null &&
      this.props.profile.loading === true
    ) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-6" />
          </div>
          <ProfileHead profile={profile} />
          <ProfileBio profile={profile} />
          <ProfileCreds profile={profile} />
          {isEmpty(profile.githubusername) ? null : (
            <ProfileGithub username={profile.githubusername} />
          )}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: propTypes.func.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
