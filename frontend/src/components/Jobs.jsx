import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    // Function to parse salary range filter
    const parseSalaryRange = (salaryFilter) => {
        // Handle formats like "0-40k", "42-1lakh", "1lakh to 5lakh"
        const filter = salaryFilter.toLowerCase().trim();

        if (filter.includes('-')) {
            const [min, max] = filter.split('-').map(s => s.trim());
            const minNum = parseInt(min) * (min.includes('lakh') ? 100000 : 1);
            const maxNum = parseInt(max) * (max.includes('lakh') ? 100000 : 1000);
            return { min: minNum, max: maxNum };
        } else if (filter.includes('to')) {
            const [min, max] = filter.split('to').map(s => s.trim());
            const minNum = parseInt(min) * (min.includes('lakh') ? 100000 : 1);
            const maxNum = parseInt(max) * (max.includes('lakh') ? 100000 : 1);
            return { min: minNum, max: maxNum };
        }
        return null;
    };

    // Function to check if job matches salary range
    const matchesSalaryFilter = (jobSalary, filterText) => {
        const salaryRange = parseSalaryRange(filterText);
        if (!salaryRange) return false;
        return jobSalary >= salaryRange.min && jobSalary <= salaryRange.max;
    };

    // Function to check if job matches industry/role filter
    const matchesIndustryFilter = (jobTitle, jobDescription, filterText) => {
        const filter = filterText.toLowerCase().trim();
        const title = jobTitle.toLowerCase();
        const description = jobDescription.toLowerCase();

        // Match job title/description with filter terms like "Frontend Developer", "Backend Developer", "FullStack Developer"
        if (filter.includes('frontend')) {
            return title.includes('frontend') || description.includes('frontend') ||
                title.includes('react') || description.includes('react') ||
                title.includes('vue') || description.includes('vue') ||
                title.includes('angular') || description.includes('angular');
        } else if (filter.includes('backend')) {
            return title.includes('backend') || description.includes('backend') ||
                title.includes('node') || description.includes('node') ||
                title.includes('python') || description.includes('python') ||
                title.includes('java') || description.includes('java') ||
                title.includes('server') || description.includes('server');
        } else if (filter.includes('fullstack')) {
            return (title.includes('fullstack') || title.includes('full stack') ||
                description.includes('fullstack') || description.includes('full stack')) ||
                ((title.includes('frontend') || description.includes('frontend')) &&
                    (title.includes('backend') || description.includes('backend')));
        }
        return false;
    };

    // Function to determine filter type
    const getFilterType = (filterText) => {
        const filter = filterText.toLowerCase().trim();

        // Check if it's an industry/role filter FIRST (before salary)
        if (filter.includes('frontend') || filter.includes('backend') || filter.includes('fullstack') || filter.includes('full stack')) {
            return 'industry';
        }

        // Check if it's a salary filter
        if (filter.includes('k') || filter.includes('lakh') || filter.includes('-')) {
            return 'salary';
        }

        // Default to search (location, title, description)
        return 'search';
    };

    useEffect(() => {
        if (searchedQuery) {
            const filterType = getFilterType(searchedQuery);
            console.log('Filter Type:', filterType, 'Search Query:', searchedQuery);

            const filteredJobs = allJobs.filter((job) => {
                if (filterType === 'salary') {
                    return matchesSalaryFilter(job.salary, searchedQuery);
                } else if (filterType === 'industry') {
                    const matches = matchesIndustryFilter(job.title, job.description, searchedQuery);
                    console.log('Job:', job.title, 'Matches:', matches);
                    return matches;
                } else {
                    // Default search filter (location, title, description)
                    return (
                        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
                    );
                }
            });
            console.log('Filtered Jobs Count:', filteredJobs.length);
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs