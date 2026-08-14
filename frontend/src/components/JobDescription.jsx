import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-6 md:my-10 px-4'>
            {/* Back Button */}
            <div className='mb-6'>
                <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2 border-purple-400/50 hover:border-purple-400 text-gray-700 hover:text-purple-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Back to Jobs
                </Button>
            </div>

            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl text-gray-900'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold bg-blue-100/50'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold bg-red-100/50'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold bg-purple-100/50'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg w-full sm:w-auto px-8 py-6 text-md shadow-lg transition-all duration-300 ${isApplied ? 'bg-gray-600 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-[#7209b7] to-[#43147d] hover:from-[#5f32ad] hover:to-[#361066] text-white hover:shadow-purple-500/30 transform hover:-translate-y-1'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            
            <div className='mt-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden'>
                <div className='bg-gray-50 border-b border-gray-200 px-6 py-4'>
                    <h1 className='font-bold text-lg text-gray-800'>Job Description</h1>
                </div>
                
                <div className='p-6 space-y-4 text-sm md:text-base'>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4'>
                        <h1 className='font-bold min-w-[140px] text-gray-900'>Role:</h1>
                        <span className='font-normal text-gray-700 break-words'>{singleJob?.title}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4'>
                        <h1 className='font-bold min-w-[140px] text-gray-900'>Location:</h1>
                        <span className='font-normal text-gray-700 break-words'>{singleJob?.location}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4'>
                        <h1 className='font-bold min-w-[140px] text-gray-900'>Description:</h1>
                        <span className='font-normal text-gray-700 break-words leading-relaxed'>{singleJob?.description}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4'>
                        <h1 className='font-bold min-w-[140px] text-gray-900'>Experience:</h1>
                        <span className='font-normal text-gray-700'>{singleJob?.experience} yrs</span>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4'>
                        <h1 className='font-bold min-w-[140px] text-gray-900'>Salary:</h1>
                        <span className='font-normal text-gray-700'>{singleJob?.salary}LPA</span>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4'>
                        <h1 className='font-bold min-w-[140px] text-gray-900'>Total Applicants:</h1>
                        <span className='font-normal text-gray-700'>{singleJob?.applications?.length}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4'>
                        <h1 className='font-bold min-w-[140px] text-gray-900'>Posted Date:</h1>
                        <span className='font-normal text-gray-700'>{singleJob?.createdAt.split("T")[0]}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription