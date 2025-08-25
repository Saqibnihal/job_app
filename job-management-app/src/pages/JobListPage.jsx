import Header from '../components/Header';
import "../styles/JobListPage.css";
import { Box, Card, Modal } from "@mui/material";
import { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import JobForm from './JobForm';

import personImage from "../assets/person.svg";
import onsite from "../assets/onsite.svg";
import lpa from "../assets/lpa.svg";

import getCompanyLogo from '../services/logoMapper';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow: "auto",
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    outline: "none",
    boxShadow: 24,
    p: 3,
};

const JobListPage = () => {

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: '',
    });

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };


    const [jobs, setJobs] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const [filters, setFilters] = useState({
        search: '',
        location: '',
        jobType: '',
        salaryRange: [0, 90000]
    });

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const fetchJobs = () => {
        axios.get('https://job-portal-api-wcpm.onrender.com/api/jobs')
            .then((res) => {
                setJobs(res.data);
            })
            .catch((err) => console.error(err));
    };

    const deleteJob = async (id) => {
        try {
            await axios.delete(`https://job-portal-api-wcpm.onrender.com/api/jobs/${id}`);
            fetchJobs();
            setSnackbar({
                open: true,
                message: 'Job deleted successfully!',
                severity: 'success',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Error deleting job.',
                severity: 'error',
            });
        }
    };

    const handleJobAdded = () => {
        setSnackbar({
            open: true,
            message: 'Job added successfully!',
            severity: 'success',
        });
        fetchJobs();
    };

    const handleJobUpdated = () => {
        setSnackbar({
            open: true,
            message: 'Job updated successfully!',
            severity: 'success',
        });
        fetchJobs();
    };

    const handleOpenAdd = () => {
        setSelectedJob(null); // new job
        setOpen(true);
    };

    const handleOpenEdit = (job) => {
        setSelectedJob(job); // existing job
        setOpen(true);
    };

    const handleCloseModal = () => setOpen(false);

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesLocation = filters.location ? job.location === filters.location : true;
        const matchesJobType = filters.jobType ? job.job_type === filters.jobType : true;
        const matchesSalary =
            Number(job.salary_min) >= filters.salaryRange[0] &&
            Number(job.salary_max) <= filters.salaryRange[1];

        return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
    });

    return (
        <>
            <div className="main-container" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <div style={{ flex: "0 0 auto", position: "static" }}>
                    <Header
                        handleOpen={handleOpenAdd}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <Box
                    sx={{
                        flex: "1 1 auto",
                        overflowY: "auto",
                        display: "grid",
                        gridTemplateColumns: {
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: "15px",
                        width: "100%",
                        margin: "0 auto",
                        padding: {
                            xs: "10px",
                            sm: "10px 0px",
                            md: "30px 5px",
                        },
                        justifyItems: "center",
                        alignItems: "start",
                    }}
                >
                    {filteredJobs.map((job) => {
                        const descriptionLines = job.description.split("\n");
                        return (
                            <Card
                                key={job.id}
                                sx={{
                                    width: "315px",
                                    height: "360px",
                                    borderRadius: "7px",
                                    display: "flex",
                                    boxShadow: "1px 1px 10px -7px black",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    background: "linear-gradient(180deg, #ff91762a, #ffffffff)",
                                }}
                            >

                                <div className="company-image">
                                    <div className="logo-image">
                                        <img
                                            src={getCompanyLogo(job.company)}
                                            alt={`${job.company} logo`}
                                            style={{ width: '65px', height: '65px' }}
                                        />
                                    </div>
                                    <div className="timing">
                                        <EditIcon
                                            sx={{
                                                color: "white",
                                                backgroundColor: "#448ed8ff",
                                                borderRadius: "50%",
                                                padding: "6px",
                                                fontSize: 32,
                                                cursor: "pointer",
                                                "&:hover": { backgroundColor: "#1565c0" },
                                            }}
                                            onClick={() => handleOpenEdit(job)}
                                        />

                                        <DeleteIcon
                                            sx={{
                                                color: "white",
                                                backgroundColor: "#cc4444ff",
                                                borderRadius: "50%",
                                                padding: "6px",
                                                fontSize: 32,
                                                cursor: "pointer",
                                                "&:hover": { backgroundColor: "#b71c1c" },
                                            }}
                                            onClick={() => deleteJob(job.id)}
                                        />
                                    </div>
                                </div>
                                <div style={{ height: "200px" }}>
                                    <div className="role">
                                        <p>{job.title}</p>
                                    </div>
                                    <div className="job-details">
                                        <span><img src={personImage} />&nbsp;1-3 yr Exp</span>
                                        <span><img src={onsite} />&nbsp;OnSite</span>
                                        <span><img src={lpa} />&nbsp;12LPA</span>
                                    </div>
                                    <div className="description-area">
                                        <ul>
                                            {descriptionLines.map((line, index) => (
                                                <li key={index}>{line.replace(/^•\s*/, '')}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="btn-section">
                                    <button className='apply-btn'>Apply Now</button>
                                </div>
                            </Card>
                        );
                    })}
                </Box>
            </div>

            <Modal open={open} onClose={handleCloseModal}>
                <Box sx={style}>

                    <JobForm
                        handleClose={handleCloseModal}
                        refreshJobs={fetchJobs}
                        jobData={selectedJob}
                        onJobAdded={handleJobAdded}
                        onJobUpdated={handleJobUpdated}
                    />

                </Box>
            </Modal>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </>
    );
};

export default JobListPage;
