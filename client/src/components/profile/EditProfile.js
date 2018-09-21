import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";
import TextAreaField from "../common/TextAreaField";
import InputGroupField from "../common/InputGroupField";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validations/isEmpty";

import {
  registerProfile,
  getCurrentProfile
} from "../../actions/profileActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: "",
      status: "",
      company: "",
      website: "",
      proflocation: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      showSocial: true,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.status = !isEmpty(profile.status) ? profile.status : "";
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.proflocation = !isEmpty(profile.location) ? profile.location : "";
      profile.skills = !isEmpty(profile.skills) ? profile.skills.join(",") : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      this.setState({ ...profile });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);

    const newProfile = {
      handle: this.state.handle,
      status: this.state.status,
      company: this.state.company,
      website: this.state.website,
      proflocation: this.state.proflocation,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.registerProfile(newProfile, this.props.history);
  };

  showSocialLinks = () => {
    this.setState(prevState => ({
      showSocial: !prevState.showSocial
    }));
  };

  render() {
    const { errors } = this.state;
    const optionsList = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      {
        label: "Student or Learning",
        value: "Student or Learning"
      },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    const socialLinks = this.state.showSocial ? (
      <div>
        <InputGroupField
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter}
          onChange={this.handleChange}
          error={errors.twitter}
        />
        <InputGroupField
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={this.state.linkedin}
          onChange={this.handleChange}
          error={errors.linkedin}
        />
        <InputGroupField
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook}
          onChange={this.handleChange}
          error={errors.facebook}
        />
        <InputGroupField
          placeholder="YouTube Channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={this.state.youtube}
          onChange={this.handleChange}
          error={errors.youtube}
        />
        <InputGroupField
          placeholder="Instagram Page URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.handleChange}
          error={errors.instagram}
        />
      </div>
    ) : null;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard">Go back</Link>
              <h1 className="display-4 text-center">Edit profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later"
                  value={this.state.handle}
                  onChange={this.handleChange}
                  error={errors.handle}
                />
                <SelectFieldGroup
                  name="status"
                  options={optionsList}
                  value={this.state.status}
                  onChange={this.handleChange}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Company"
                  name="company"
                  info="Could be your own company or one you work for"
                  value={this.state.company}
                  onChange={this.handleChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Website"
                  name="website"
                  info="Could be your own or a company website"
                  value={this.state.website}
                  onChange={this.handleChange}
                  error={errors.website}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="location"
                  name="location"
                  info="City & state suggested (eg. Boston, MA)"
                  value={this.state.proflocation}
                  onChange={this.handleChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Skills"
                  name="skills"
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                  value={this.state.skills}
                  onChange={this.handleChange}
                  error={errors.skills}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  info="If you want your latest repos and a Github link, include your username"
                  value={this.state.githubusername}
                  onChange={this.handleChange}
                  error={errors.githubusername}
                />
                <TextAreaField
                  type="text"
                  placeholder="A short bio of yourself"
                  name="bio"
                  info="Tell us a little about yourself"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  error={errors.bio}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={this.showSocialLinks}
                  >
                    Add Social Network Links
                  </button>
                </div>
                {socialLinks}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  registerProfile: propTypes.func.isRequired,
  errors: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
  handle: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  company: propTypes.string,
  website: propTypes.string,
  proflocation: propTypes.string,
  skills: propTypes.string.isRequired,
  githubusername: propTypes.string,
  bio: propTypes.string,
  social: propTypes.object,
  twitter: propTypes.string,
  facebook: propTypes.string,
  linkedin: propTypes.string,
  youtube: propTypes.string,
  instagram: propTypes.string
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

EditProfile.defaultProps = {
  handle: "",
  status: "",
  skills: ""
};

export default connect(
  mapStateToProps,
  { registerProfile, getCurrentProfile }
)(withRouter(EditProfile));
