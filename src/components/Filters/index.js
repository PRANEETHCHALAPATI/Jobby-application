import './index.css'

const Filters = ({
  employmentTypesList,
  salaryRangesList,
  changeEmploymentType,
  changeSalaryRange,
}) => (
  <div className="filters-container">
    {/* Employment Type Filter */}
    <div className="filter-group">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(eachType => (
          <li key={eachType.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              className="filter-input"
              onChange={() => changeEmploymentType(eachType.employmentTypeId)}
            />
            <label htmlFor={eachType.employmentTypeId} className="filter-label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>

    <hr className="separator" />

    {/* Salary Range Filter */}
    <div className="filter-group">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(eachRange => (
          <li key={eachRange.salaryRangeId} className="filter-item">
            <input
              type="radio"
              name="salary"
              id={eachRange.salaryRangeId}
              className="filter-input"
              onChange={() => changeSalaryRange(eachRange.salaryRangeId)}
            />
            <label htmlFor={eachRange.salaryRangeId} className="filter-label">
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default Filters
