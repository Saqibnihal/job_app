/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear existing rows
  await knex('jobs').del();

  // Insert new sample data
  await knex('jobs').insert([
    {
      title: 'Frontend Developer',
      company:'Amazon',
      location: 'Chennai',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Build and maintain UI components for our platform.',
      job_type: 'Full Time',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 40000,
      salary_max: 60000,
      deadline: '2025-09-01'
    },
    {
      title: 'Backend Developer',
      company:'Microsoft',
      location: 'Bengaluru',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Develop and maintain scalable backend services.',
      job_type: 'Part Time',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 30000,
      salary_max: 50000,
      deadline: '2025-08-20'
    },
    {
      title: 'Full Stack Engineer',
      company:'Amazon',
      location: 'Bengaluru',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Work on both client and server-side applications.',
      job_type: 'Full Time',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 70000,
      salary_max: 100000,
      deadline: '2025-10-15'
    },
    {
      title: 'UI/UX Designer',
      company:'Amazon',
      location: 'Chennai',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Design user-friendly interfaces and experiences.',
      job_type: 'Contract',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 45000,
      salary_max: 65000,
      deadline: '2025-08-30'
    },
    {
      title: 'DevOps Engineer',
      company:'Amazon',
      location: 'Chennai',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Manage CI/CD pipelines and cloud infrastructure.',
      job_type: 'Full Time',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 80000,
      salary_max: 100000,
      deadline: '2025-09-20'
    },
    {
      title: 'Data Scientist',
      company:'Amazon',
      location: 'Coimbatore',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Analyze data and build predictive models.',
      job_type: 'Full Time',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 90000,
      salary_max: 120000,
      deadline: '2025-09-10'
    },
    {
      title: 'Mobile App Developer',
      company:'Swiggy',
      location: 'Coimbatore',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Develop Android and iOS applications.',
      job_type: 'Full Time',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 60000,
      salary_max: 85000,
      deadline: '2025-08-25'
    },
    {
      title: 'QA Engineer',
      company:'Amazon',
      location: 'Coimbatore',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Test and ensure the quality of our products.',
      job_type: 'Part Time',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 35000,
      salary_max: 80000,
      deadline: '2025-09-05'
    },
    {
      title: 'Systems Analyst',
      company:'Amazon',
      location: 'Chennai',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Analyze and improve system performance.',
      job_type: 'Full Time',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 50000,
      salary_max: 75000,
      deadline: '2025-09-12'
    },
    {
      title: 'Technical Support Specialist',
      company:'Amazon',
      location: 'Chennai',
      description: 'Build and maintain UI components for our platform.Build and maintain UI components for our platform.Provide technical support to customers.',
      job_type: 'Internship',
      logo_url: 'https://via.placeholder.com/100',
      salary_min: 30000,
      salary_max: 45000,
      deadline: '2025-08-22'
    }
  ]);
};
