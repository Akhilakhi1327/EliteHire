import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFilter, setShowFilter] = useState(false);

    const parseSalaryRange = (salaryFilter) => {
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

    const matchesSalaryFilter = (jobSalary, filterText) => {
        const salaryRange = parseSalaryRange(filterText);
        if (!salaryRange) return false;
        return jobSalary >= salaryRange.min && jobSalary <= salaryRange.max;
    };

    const matchesIndustryFilter = (jobTitle, jobDescription, filterText) => {
        const filter = filterText.toLowerCase().trim();
        const title = jobTitle.toLowerCase();
        const description = jobDescription.toLowerCase();
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

    const getFilterType = (filterText) => {
        const filter = filterText.toLowerCase().trim();
        if (filter.includes('frontend') || filter.includes('backend') || filter.includes('fullstack') || filter.includes('full stack')) {
            return 'industry';
        }
        if (filter.includes('k') || filter.includes('lakh') || filter.includes('-')) {
            return 'salary';
        }
        return 'search';
    };

    useEffect(() => {
        if (searchedQuery) {
            const filterType = getFilterType(searchedQuery);
            const filteredJobs = allJobs.filter((job) => {
                if (filterType === 'salary') {
                    return matchesSalaryFilter(job.salary, searchedQuery);
                } else if (filterType === 'industry') {
                    return matchesIndustryFilter(job.title, job.description, searchedQuery);
                } else {
                    return (
                        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
                    );
                }
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />

            {/* Mobile Filter Toggle Button */}
            <div className="md:hidden flex justify-end px-4 pt-4">
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow transition-all duration-300"
                >
                    {showFilter ? <><X className="w-4 h-4" /> Hide Filters</> : <><SlidersHorizontal className="w-4 h-4" /> Show Filters</>}
                </button>
            </div>

            {/* Mobile Filter Panel */}
            {showFilter && (
                <div className="md:hidden px-4 pt-3">
                    <FilterCard />
                </div>
            )}

            <div className='max-w-7xl mx-auto mt-4 px-4'>
                <div className='flex gap-5'>
                    {/* Desktop Filter Sidebar */}
                    <div className='hidden md:block w-[280px] flex-shrink-0'>
                        <FilterCard />
                    </div>

                    {filterJobs.length <= 0 ? (
                        <div className="flex-1 flex items-center justify-center py-20">
                            <span className="text-gray-500 text-lg">No jobs found</span>
                        </div>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}>
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Jobs