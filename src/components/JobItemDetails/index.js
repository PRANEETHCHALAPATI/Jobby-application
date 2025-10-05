// components/JobItemDetails/index.js
import {Component} from 'react'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp, IoBagRemove} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(jobDetailsUrl, options)
      if (response.ok) {
        const data = await response.json()
        const jobDetails = data.job_details
        const similarJobs = data.similar_jobs

        const updatedJobDetails = {
          companyLogoUrl: jobDetails.company_logo_url,
          companyWebsiteUrl: jobDetails.company_website_url,
          employmentType: jobDetails.employment_type,
          id: jobDetails.id,
          jobDescription: jobDetails.job_description,
          location: jobDetails.location,
          packagePerAnnum: jobDetails.package_per_annum,
          rating: jobDetails.rating,
          title: jobDetails.title,
          skills: jobDetails.skills.map(skill => ({
            name: skill.name,
            imageUrl: skill.image_url,
          })),
          lifeAtCompany: {
            description: jobDetails.life_at_company.description,
            imageUrl: jobDetails.life_at_company.image_url,
          },
        }

        const updatedSimilarJobs = similarJobs.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
          title: job.title,
        }))

        this.setState({
          jobDetails: updatedJobDetails,
          similarJobs: updatedSimilarJobs,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderSkills = skills => (
    <div className="skills-container">
      <h2 className="skills-heading">Skills</h2>
      <ul className="skills-list">
        {skills.map(skill => (
          <li key={skill.name} className="skill-item">
            <img
              src={skill.imageUrl}
              alt={skill.name}
              className="skill-image"
            />
            <p className="skill-name">{skill.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  renderLifeAtCompany = lifeAtCompany => (
    <div className="life-at-company-container">
      <h2 className="life-at-company-heading">Life at Company</h2>
      <div className="life-at-company-content">
        <p className="life-at-company-description">
          {lifeAtCompany.description}
        </p>
        <img
          src={lifeAtCompany.imageUrl}
          alt="life at company"
          className="life-at-company-image"
        />
      </div>
    </div>
  )

  renderSimilarJob = job => (
    <li key={job.id} className="similar-job-item">
      <div className="similar-job-header">
        <div className="similar-company-info">
          <img
            src={job.companyLogoUrl}
            alt="similar job company logo"
            className="similar-company-logo"
          />
          <div className="similar-job-details">
            <h3 className="similar-job-title">{job.title}</h3>
            <div className="similar-rating-container">
              <FaStar className="similar-star-icon" />
              <p className="similar-rating">{job.rating}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="similar-job-description">
        <h4 className="similar-description-heading">Description</h4>
        <p className="similar-description-text">{job.jobDescription}</p>
      </div>
      <div className="similar-job-meta">
        <div className="similar-location-type">
          <div className="similar-location-container">
            <IoLocationSharp className="similar-location-icon" />
            <p className="similar-location">{job.location}</p>
          </div>
          <div className="similar-employment-type-container">
            <IoBagRemove className="similar-employment-icon" />
            <p className="similar-employment-type">{job.employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )

  renderSimilarJobs = similarJobs => (
    <div className="similar-jobs-container">
      <h2 className="similar-jobs-heading">Similar Jobs</h2>
      <ul className="similar-jobs-list">
        {similarJobs.map(job => this.renderSimilarJob(job))}
      </ul>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-details-container">
        {/* Main Job Card */}
        <div className="job-details-card">
          <div className="job-header">
            <div className="company-info">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="job-details">
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <FaStar className="star-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="job-meta">
            <div className="location-type">
              <div className="location-container">
                <IoLocationSharp className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employment-type-container">
                <IoBagRemove className="employment-icon" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="separator" />

          {/* Description with Visit Link */}
          <div className="description-section">
            <div className="description-header">
              <h2 className="description-heading">Description</h2>
              {companyWebsiteUrl && (
                <a
                  href={companyWebsiteUrl}
                  className="visit-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit <FaExternalLinkAlt className="external-link-icon" />
                </a>
              )}
            </div>
            <p className="description-text">{jobDescription}</p>
          </div>

          {/* Skills Section */}
          {skills && this.renderSkills(skills)}

          {/* Life at Company Section */}
          {lifeAtCompany && this.renderLifeAtCompany(lifeAtCompany)}
        </div>

        {/* Similar Jobs Section */}
        {similarJobs && this.renderSimilarJobs(similarJobs)}
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
