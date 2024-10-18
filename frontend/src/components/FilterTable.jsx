import React, { useState } from 'react';

// Data for filters
const categories = [
  'OPEN',
  'OPEN (PwD)',
  'GEN-EWS',
  'GEN-EWS(PwD)',
  'OBC-NCL',
  'OBC-NCL(PwD)',
  'SC',
  'SC (PwD)',
  'ST',
  'ST (PwD)',
];

const quotas = ['All', 'AI', 'HS', 'OS', 'AP', 'GO'];

const courseDuration = ['All', '4 Years', '5 Years'];

const seatTypes = ['All', 'Gender-Neutral', 'Female-Only'];

// Hardcoded college data
const colleges = [
  {
    institute: '6006 - COEP Technological University',
    program: 'Computer Engineering',
    quota: 'AI',
    category: 'OPEN',
    seat: 'Gender-Neutral',
    openingRank: 1,
    closingRank: 5000,
    type: "",
    courseDuration: '4 Years',
  },
  {
    institute: '6271 - Pune Institute of Computer Technology, Dhankavdi, Pune',
    program: 'Computer Engineering',
    quota: 'AI',
    category: 'OPEN',
    seat: 'Gender-Neutral',
    openingRank: 1,
    closingRank: 7000,
    type: "",
    courseDuration: '4 Years',
  },
  {
    institute: "3215 - Bhartiya Vidya Bhavan's Sardar Patel Institute  of Technology , Andheri,Mumbai",
    program: 'Computer Engineering',
    quota: 'AI',
    category: 'OPEN',
    seat: 'Gender-Neutral',
    openingRank: 1,
    closingRank: 6000,
    type: "",
    courseDuration: '4 Years',
  },
  {
    institute: "3199 - Shri Vile Parle Kelvani Mandal's Dwarkadas J. Sanghvi College ofEngineering, Vile Parle,Mumbai",
    program: 'Computer Engineering',
    quota: 'AI',
    category: 'OPEN',
    seat: 'Gender-Neutral',
    openingRank: 1,
    closingRank: 10000,
    type: "",
    courseDuration: '4 Years',
  },
  {
    institute: '3036 - Institute of Chemical Technology, Matunga, Mumbai',
    program: 'Computer Engineering',
    quota: 'AI',
    category: 'OPEN',
    seat: 'Gender-Neutral',
    openingRank: 1,
    closingRank: 5000,
    type: "",
    courseDuration: '4 Years',
  },
  {
    institute: '6175 - Pimpri Chinchwad Education Trust, Pimpri Chinchwad College of Engineering, Pune',
    program: 'Computer Engineering',
    quota: 'AI',
    category: 'OPEN',
    seat: 'Gender-Neutral',
    openingRank: 1,
    closingRank: 11000,
    type: "",
    courseDuration: '4 Years',
  },
  {
    institute: "6272 - Dr. D. Y. Patil Pratishthan's D.Y.Patil College of Engineering Akurdi, Pune",
    program: 'Computer Engineering',
    quota: 'AI',
    category: 'OPEN',
    seat: 'Gender-Neutral',
    openingRank: 1,
    closingRank: 9000,
    type: "",
    courseDuration: '4 Years',
  },
  {
    institute: '6007 - Walchand College of Engineering, Sangli',
    program: 'Computer Engineering',
    quota: 'AI',
    category: 'OPEN',
    seat: 'Gender-Neutral',
    openingRank: 1,
    closingRank: 15000,
    type: "",
    courseDuration: '4 Years',
  },
  // Add more colleges as needed
];

// Columns configuration
const columns = [
  {
    title: 'Institute Name',
    property: 'institute',
    style: { width: '30%' },
  },
  {
    title: 'Program',
    property: 'program',
    style: { width: '30%' },
  },
  {
    title: 'Quota',
    property: 'quota',
    data: quotas,
    style: { width: '10%' },
  },
  {
    title: 'Category',
    property: 'category',
    data: categories,
    style: { width: '10%' },
  },
  {
    title: 'Seat Type',
    property: 'seat',
    data: seatTypes,
    style: { width: '10%' },
  },
  {
    title: 'Opening Rank',
    property: 'openingRank',
    style: { width: '5%' },
  },
  {
    title: 'Closing Rank',
    property: 'closingRank',
    style: { width: '5%' },
  },
  {
    title: 'College Type',
    property: 'type',
    style: { width: '5%' },
  },
  {
    title: 'Course Duration',
    property: 'courseDuration',
    data: courseDuration,
    style: { width: '5%' },
  },
];

// TableFilter Component for dropdown filters
const TableFilter = ({ title, property, value, data, updateFilters }) => (
  <th className="p-2 border border-[#333333]">
    <span className="font-semibold">{title}</span>
    {data && data.length > 0 && (
      <select
        id={property}
        name={title}
        value={value}
        onChange={(e) => updateFilters(property, e.target.value)}
        className="mt-1 ml-1 p-1 bg-[#D4AF37] text-[#333333] border-2 border-[#333333] rounded focus:outline-none"
      >
        {data.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    )}
  </th>
);

// CollegeTable Component that renders the filtered colleges
const CollegeTable = ({ filters, updateFilters, filteredColleges }) => (
  <table className="min-w-full table-auto border-collapse bg-gray-100 shadow-lg mt-5">
    <thead className="bg-[#D4AF37] text-[#333333]">
      <tr>
        {columns.map((column) => (
          <TableFilter
            key={column.property}
            title={column.title}
            property={column.property}
            value={filters[column.property]}
            data={column.data}
            updateFilters={updateFilters}
          />
        ))}
      </tr>
    </thead>
    <tbody>
      {filteredColleges.length > 0 ? (
        filteredColleges.map((college, index) => (
          <tr key={index} className="border-t">
            {columns.map((column) => (
              <td key={column.property} className="p-2 border border-gray-300">
                {college[column.property]}
              </td>
            ))}
          </tr>
        ))
      ) : null}
    </tbody>
  </table>
);

// CollegePredictorWithFilters Component that handles filtering logic
const CollegePredictorWithFilters = ({ rank }) => {
  const [filters, setFilters] = useState({
    category: 'OPEN',
    quota: 'All',
    seat: 'All',
    courseDuration: 'All',
  });

  // Function to update filters
  const updateFilters = (property, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  // Filter the colleges based on the selected filters
  const filteredColleges = colleges.filter((college) => {
    const categoryCheck = filters.category === 'All' || college.category === filters.category;
    const quotaCheck = filters.quota === 'All' || college.quota === filters.quota;
    const seatCheck = filters.seat === 'All' || college.seat === filters.seat;
    const durationCheck =
      filters.courseDuration === 'All' || college.courseDuration === filters.courseDuration;

    // Check if the rank falls within the closing rank of the college
    const rankCheck = rank <= college.closingRank;

    return categoryCheck && quotaCheck && seatCheck && durationCheck && rankCheck;
  });

  return (
    <div className="">
      {filteredColleges.length > 0 ? (
        <CollegeTable
          filters={filters}
          updateFilters={updateFilters}
          filteredColleges={filteredColleges}
        />
      ) : (
        <div className="text-center py-3">
        </div>
      )}
    </div>
  );
};

export default CollegePredictorWithFilters;
