import "../styles/Header.css"
import logo from "../assets/logo.png"
import location from "../assets/location.png"
import search from "../assets/search.png"
import people from "../assets/people.png"
import Slider from '@mui/material/Slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    FormControl,
    MenuItem,
    Select,
    styled
} from "@mui/material";

const CustomDropdownIcon = () => (
    <KeyboardArrowDownIcon sx={{
        fontSize: '26px',
        color: '#686868',
        fontWeight: 300,
        cursor: "pointer",
        marginRight: "-8px"
    }} />
);

const CustomMenuItem = styled(MenuItem)(() => ({
    listStyle: 'none',
    marginLeft: "-5px",
    color: "black"
}));

const Header = ({ handleOpen, filters, onFilterChange }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Assume your jobs go from 0 to 150000
    const FULL_SALARY_RANGE = [0, 150000];

    const [value, setValue] = useState(FULL_SALARY_RANGE);

    useEffect(() => {
        onFilterChange("salaryRange", FULL_SALARY_RANGE);
    }, []);

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleSliderChange = (e, newValue) => {
        setValue(newValue);
        onFilterChange("salaryRange", newValue);
    };
    const formatSalary = (num) => {
        return num >= 1000 ? `${Math.floor(num / 1000)}k` : num;
    };

    const menuItems = [
        { label: "Home", href: "#" },
        { label: "Find Jobs", href: "#" },
        { label: "Find Talents", href: "#" },
        { label: "About us", href: "#" },
        { label: "Testimonials", href: "#" },
    ];

    const drawer = (
        <Box sx={{ width: 250 }} onClick={() => setMobileOpen(false)}>
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.label} component="a" href={item.href}>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
                <ListItem button onClick={handleOpen}>
                    <ListItemText
                        primary="Create Jobs" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            {/* Responsive AppBar */}
            <AppBar position="static"
                sx={{
                    backgroundColor: "white", borderBottom: "2px solid #ff7e5f", boxShadow: "none"
                }}>
                <Toolbar sx={{
                    justifyContent: "space-between",
                    padding: "0 16px"
                }}>
                    {/* Left Logo */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src={logo} alt="logo" style={{ height: 50 }} />
                    </Box>

                    {
                        isMobile &&
                        <Box
                            sx={{
                                marginTop: "0px",
                                marginLeft: "50px"
                            }}
                            className="filter-box">
                            <img src={search}
                                style={{
                                    width: "20px",
                                    height: "20px",
                                }} />
                            <input
                                type="text"
                                placeholder="Search By Job Title, Role"
                                value={filters.search}
                                onChange={(e) => onFilterChange('search', e.target.value)}
                                className="mobile-search"
                            />
                        </Box>
                    }

                    {/* Desktop Menu */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: "24px", alignItems: "center" }}>
                        {menuItems.map((item) => (
                            <a key={item.label} href={item.href} style={{ textDecoration: "none", color: "black" }}>
                                {item.label}
                            </a>
                        ))}
                        <button
                            className="create-btn"
                            onClick={handleOpen}
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: "8px",
                                padding: "8px 16px",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Create Jobs
                        </button>
                    </Box>



                    {/* Mobile Menu Icon */}
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() => setMobileOpen(true)}
                        sx={{ display: { md: "none" }, color: "black" }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>

            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 }
                }}
            >
                {drawer}
            </Drawer>




            {/* Filters Section (unchanged) */}
            <div className="filter-container">
                {
                    !isMobile &&
                    <>
                        <div className="filter-box">
                            <img src={search}
                                style={{
                                    width: "20px",
                                    height: "20px",
                                }} />
                            <input
                                type="text"
                                placeholder="Search By Job Title, Role"
                                value={filters.search}
                                onChange={(e) => onFilterChange('search', e.target.value)}
                            />
                        </div>


                        {/* Location Dropdown */}
                        <div className="filter-box">
                            <img src={location} style={{ width: "18px", height: "23px" }} />
                            <FormControl sx={{ width: '200px' }}>
                                <Select
                                    value={filters.location}
                                    onChange={(e) => onFilterChange('location', e.target.value)}
                                    IconComponent={CustomDropdownIcon}
                                    displayEmpty
                                    sx={{
                                        width: "248px",
                                        borderRadius: '10px',
                                        height: '50px',
                                        border: 'none',
                                        fontSize: '16px',
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '&.Mui-focused': { boxShadow: 'none' },
                                        padding: "5px 0px 5px 10px"
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                borderRadius: '10px',
                                                boxShadow: '0px 0px 14px 0px #93939340',
                                            }
                                        }
                                    }}
                                >
                                    <CustomMenuItem value="">All Locations</CustomMenuItem>
                                    <CustomMenuItem value="" selected sx={{ display: "none" }}>
                                        <em style={{ color: "grey", fontStyle: "normal" }}>Preferred Location</em>
                                    </CustomMenuItem>
                                    <CustomMenuItem value="Chennai">Chennai</CustomMenuItem>
                                    <CustomMenuItem value="Coimbatore">Coimbatore</CustomMenuItem>
                                    <CustomMenuItem value="Bengaluru">Bengaluru</CustomMenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* Job Type Dropdown */}

                        <div className="filter-box">
                            <img src={people} style={{ width: "21px", height: "19px" }} />
                            <FormControl sx={{ width: '200px' }}>
                                <Select
                                    value={filters.jobType}
                                    onChange={(e) => onFilterChange('jobType', e.target.value)}
                                    IconComponent={CustomDropdownIcon}
                                    displayEmpty
                                    sx={{
                                        width: "250px",
                                        borderRadius: '10px',
                                        height: '50px',
                                        border: 'none',
                                        fontSize: '16px',
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '&.Mui-focused': { boxShadow: 'none' },
                                        padding: "4px 2px 0px 7px"
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                borderRadius: '10px',
                                                boxShadow: '0px 0px 14px 0px #93939340',
                                            }
                                        }
                                    }}
                                >
                                    <CustomMenuItem value="">All Job Types</CustomMenuItem>
                                    <CustomMenuItem value="" selected sx={{ display: "none" }}>
                                        <em style={{ color: "grey", fontStyle: "normal" }}>Job Type</em>
                                    </CustomMenuItem>
                                    <CustomMenuItem value="Full Time">Full Time</CustomMenuItem>
                                    <CustomMenuItem value="Internship">Internship</CustomMenuItem>
                                    <CustomMenuItem value="Part Time">Part Time</CustomMenuItem>
                                    <CustomMenuItem value="Contract">Contract</CustomMenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* Salary Slider */}
                        <div className="filter-box" style={{ flexDirection: "column" }}>
                            <div style={{
                                display: "flex",
                                gap: "10px",
                                margin: "10px auto",
                            }}>
                                <span>Salary Per Month</span>
                                <span>
                                    ₹{formatSalary(value[0])} - ₹{formatSalary(value[1])}
                                </span>
                            </div>
                            <Slider
                                value={value}
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={150000}
                                step={1}
                                sx={{
                                    color: 'black',
                                    width: "250px",
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: 'white',
                                        border: '5px solid black',
                                        width: 15,
                                        height: 15,
                                        boxShadow: 'none',
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.16)',
                                        },
                                    },
                                    '& .MuiSlider-track': {
                                        backgroundColor: 'black',
                                        height: 3,
                                    },
                                    '& .MuiSlider-rail': {
                                        backgroundColor: '#eee',
                                        height: 3,
                                    },
                                    '& .MuiSlider-valueLabel': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
                                    },
                                }}
                            />
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default Header;
