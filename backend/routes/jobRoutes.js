const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.query();
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);  // Log full error details
    res.status(500).json({ error: 'Failed to fetch jobs', details: err.message });
  }
});

// POST add job
router.post('/', async (req, res) => {
  try {
    const body = req.body;

    const jobData = {
      title: body.title,
      company: body.company,
      location: body.location,
      description: body.description,
      job_type: body.job_type || body.type || body.jobType,
      salary_min: body.salary_min || body.salaryMin,
      salary_max: body.salary_max || body.salaryMax,
      deadline: body.deadline,
      logo_url: body.logo_url || body.logoUrl || null
    };

    const newJob = await Job.query().insert(jobData);
    res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE job
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Job.query().deleteById(id);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// UPDATE job
router.put('/:id', async (req, res) => {
  try {
    const body = req.body;

    const updatedData = {
      title: body.title,
      company: body.company,
      location: body.location,
      description: body.description,
      job_type: body.job_type || body.type || body.jobType,
      salary_min: body.salary_min || body.salaryMin,
      salary_max: body.salary_max || body.salaryMax,
      deadline: body.deadline,
      logo_url: body.logo_url || body.logoUrl || null
    };

    await Job.query().findById(req.params.id).patch(updatedData);
    res.status(200).json({ message: 'Job updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job' });
  }
});

module.exports = router;
