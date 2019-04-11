import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { getCurrentProfile, deleteUser } from "./../../actions/profileActions";
import Spinner from "./common/Spinner";
import ProfileActions from "./profile/ProfileActions";
import Experience from "./profile/Experience";
import Education from "./profile/Education";
import { logoutUser } from "./../../actions/authActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  deleteUser = () => {
    this.props.deleteUser();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p>Welcome {user.name},</p>

            <ProfileActions userID={user.id} />

            <Experience experiences={profile.experience} />
            <Education educations={profile.education} />
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <h1>{user.name},</h1>
            <p>you can create your profile by clicking here</p>
            <Link to="/create-profile">
              <button className="btn btn-lg btn-primary">Create profile</button>
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="container">
          <h1>Dashboard</h1>
          {dashboardContent}
          <button className="btn btn-danger mt-5" onClick={this.deleteUser}>
            Delete my account
          </button>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  deleteUser: propTypes.func.isRequired,
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteUser, logoutUser }
)(Dashboard);
