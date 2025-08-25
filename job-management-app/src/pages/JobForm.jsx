import {
    Box, FormControl, MenuItem, Select, styled,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "../styles/JobForm.css";

import minmaxSalary from "../assets/minsalary.svg";
import calendar from "../assets/calendar.svg";
import savedraft from "../assets/savedraft.svg";
import publish from "../assets/publish.svg";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomDropdownIcon = () => (
    <KeyboardArrowDownIcon sx={{
        fontSize: '32px',
        color: '#222222',
        marginRight: '-7px',
        marginTop: "-4px",
        fontFamily: "inherit",
        fontWeight: "100",
        cursor: "pointer"
    }} />
);

const CustomMenuItem = styled(MenuItem)(() => ({
    listStyle: 'none',
    marginLeft: "-5px"
}));

//----------- Yup Schema
const schema = yup.object({
    title: yup.string().required("Job title is required"),
    company: yup.string().required("Company name is required"),
    location: yup.string().required("Location is required"),
    jobType: yup.string().required("Job type is required"),
    salaryMin: yup.number().typeError("Enter minimum salary").required(),
    salaryMax: yup.number().typeError("Enter maximum salary").required(),
    deadline: yup.string().required("Application deadline is required"),
    description: yup.string().required("Description is required")
});

const JobForm = ({ handleClose, refreshJobs, jobData, onJobAdded, onJobUpdated }) => {
    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            company: '',
            location: '',
            description: '',
            jobType: '',
            salaryMin: '',
            salaryMax: '',
            deadline: '',
        }
    });

    // Pre-fill form if editing
    useEffect(() => {
        if (jobData) {
            reset({
                title: jobData.title || '',
                company: jobData.company || '',
                location: jobData.location || '',
                description: jobData.description || '',
                jobType: jobData.jobype || jobData.job_type || '',
                salaryMin: jobData.salaryMin || jobData.salary_min || '',
                salaryMax: jobData.salaryMax || jobData.salary_max || '',
                deadline: jobData.deadline ? jobData.deadline.split("T")[0] : '',
            });
        }
    }, [jobData, reset]);

    const onSubmit = async (data) => {
        try {
            console.log("Submitting job:", data);

            if (jobData && jobData.id) {
                // Edit mode
                await axios.put(`https://job-portal-api-wcpm.onrender.com/api/jobs/${jobData.id}`, data);
                onJobUpdated();
            } else {
                // Create mode
                await axios.post("https://job-portal-api-wcpm.onrender.com/api/jobs", data);
                onJobAdded();
            }

            reset();
            refreshJobs();
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };

    const CustomBoxForModal = styled(Box)(({ theme }) => ({
        height: "450px",
        outline: "none",
        border: "none",
        [theme.breakpoints.down("md")]: {
            width: "300px"
        },
    }));

    const CustomSelectForModal = styled(Select)(({ theme }) => ({
        borderRadius: '10px',
        height: '58px',
        border: '1px solid #BCBCBC',
        padding: '5px 16px 0px 0',
        fontSize: '18px',
        fontFamily: "inherit",
        fontWeight: "600",
        [theme.breakpoints.down("md")]: {
            width: "300px"
        },
    }));

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <CustomBoxForModal>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-title">
                    <h2>{jobData ? "Edit Job Opening" : "Create Job Opening"}</h2>
                </div>

                <div className="title-name">
                    <div className="input-content">
                        <label htmlFor="title">Job Title</label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Enter job Title" />}
                        />
                    </div>
                    <div className="input-content">
                        <label htmlFor="company">Company Name</label>
                        <Controller
                            name="company"
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Amazon, Microsoft, Swiggy" />}
                        />
                    </div>
                </div>

                <div className="location-jobtype">
                    <FormControl sx={{ width: { md: 300, lg: 376 } }}>
                        <label htmlFor="location">Location</label>
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <CustomSelectForModal {...field} IconComponent={CustomDropdownIcon} displayEmpty>
                                    <CustomMenuItem sx={{ display: "none" }} disabled value="">
                                        <em style={{
                                            color: "grey", fontStyle: "normal", fontFamily: "inherit", fontSize: "16px",
                                            fontWeight: "500"
                                        }}>
                                            Choose Preferred Location
                                        </em>
                                    </CustomMenuItem>
                                    <CustomMenuItem value="Chennai">Chennai</CustomMenuItem>
                                    <CustomMenuItem value="Bengaluru">Bengaluru</CustomMenuItem>
                                    <CustomMenuItem value="Coimbatore">Coimbatore</CustomMenuItem>
                                </CustomSelectForModal>
                            )}
                        />
                    </FormControl>

                    <FormControl sx={{ width: { md: 300, lg: 376 } }}>
                        <label htmlFor="jobType">Job Type</label>
                        <Controller
                            name="jobType"
                            control={control}
                            render={({ field }) => (
                                <CustomSelectForModal {...field} IconComponent={CustomDropdownIcon} displayEmpty>
                                    <CustomMenuItem sx={{ display: "none" }} disabled value="">
                                        <em style={{
                                            color: "grey", fontStyle: "normal", fontFamily: "inherit", fontSize: "16px",
                                            fontWeight: "500"
                                        }}>FullTime</em>
                                    </CustomMenuItem>
                                    <CustomMenuItem value="Internship">Internship</CustomMenuItem>
                                    <CustomMenuItem value="Full Time">Full Time</CustomMenuItem>
                                    <CustomMenuItem value="Part Time">Part time</CustomMenuItem>
                                    <CustomMenuItem value="Contract">Contract</CustomMenuItem>
                                </CustomSelectForModal>
                            )}
                        />
                    </FormControl>
                </div>

                <div className="salary-deadline">
                    <div className="input-content">
                        <label htmlFor="salaryMin">Salary Range</label>
                        <div className="salary-range-container">
                            <div className="salary-input">
                                <img src={minmaxSalary} alt="₹" style={{ width: "16px", marginRight: "2px" }} />
                                <Controller
                                    name="salaryMin"
                                    control={control}
                                    render={({ field }) => (
                                        <input {...field} placeholder="₹0" style={{
                                            fontFamily: "inherit",
                                            fontWeight: "600",
                                            border: "none",
                                            outline: "none",
                                            width: "100%",
                                            fontSize: "16px",
                                        }} />
                                    )}
                                />
                            </div>
                            <div className="salary-input2">
                                <img src={minmaxSalary} alt="₹" style={{ width: "14px", marginRight: "2px" }} />
                                <Controller
                                    name="salaryMax"
                                    control={control}
                                    render={({ field }) => (
                                        <input {...field} placeholder="₹12,00,000" style={{
                                            fontFamily: "inherit",
                                            border: "none",
                                            fontWeight: "600",
                                            outline: "none",
                                            width: "100%",
                                            fontSize: "16px"
                                        }} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-content">
                        <label htmlFor="deadline">Application Deadline</label>
                        <div style={{ position: "relative", width: isMobile ? "300px" : "100%" }}>
                            <Controller
                                name="deadline"
                                control={control}
                                render={({ field }) => (
                                    <input {...field} type="date" ref={field.ref} className="deadline-input"
                                        style={{ color: field.value ? 'black' : 'transparent' }} />
                                )}
                            />
                            <img
                                src={calendar}
                                alt="calendar"
                                onClick={() => document.querySelector('input[type="date"]').showPicker?.()}
                                className="calender-image-icon"
                            />
                        </div>
                    </div>
                </div>

                <div className="job-description">
                    <label>Job Description</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea {...field} className="textarea-input"
                                placeholder="Please share a description to let the candidate know more about the job role" />
                        )}
                    />
                </div>

                <div className="form-buttons">
                    <button className="save-draft" onClick={handleClose} type="button">
                        Save Draft
                        <img src={savedraft} style={{ width: "12px", marginLeft: "10px" }} />
                    </button>
                    <button className="save-draft" type="submit">
                        {jobData ? "Update" : "Publish"}
                        <img src={publish} style={{ width: "12px", marginLeft: "10px" }} />
                    </button>
                </div>
            </form>
        </CustomBoxForModal>
    );
};

export default JobForm;
