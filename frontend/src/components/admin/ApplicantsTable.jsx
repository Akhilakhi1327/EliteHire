import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { MoreHorizontal, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [replyStatus, setReplyStatus] = useState('Accepted');
    const [isLoadingReply, setIsLoadingReply] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!selectedApplicant) return;

        try {
            setIsLoadingReply(true);
            const res = await axios.post(
                'http://localhost:8000/api/v1/notification/send-reply',
                {
                    applicationId: selectedApplicant._id,
                    status: replyStatus,
                    message: replyMessage
                },
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success('Email sent successfully!');
                setReplyMessage('');
                setReplyStatus('Accepted');
                setSelectedApplicant(null);
                setOpenDialog(false);
            }
        } catch (error) {
            console.log('Error sending reply:', error);
            toast.error(error?.response?.data?.message || 'Failed to send email');
        } finally {
            setIsLoadingReply(false);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40">
                                            <div className='space-y-2'>
                                                {
                                                    shortlistingStatus.map((status, index) => {
                                                        return (
                                                            <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center cursor-pointer hover:bg-gray-100 p-2 rounded'>
                                                                <span className='text-sm'>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <Dialog open={openDialog && selectedApplicant?._id === item._id} onOpenChange={(open) => {
                                                    setOpenDialog(open);
                                                    if (!open) setSelectedApplicant(null);
                                                }}>
                                                    <DialogTrigger asChild>
                                                        <div onClick={() => {
                                                            setSelectedApplicant(item);
                                                            setOpenDialog(true);
                                                        }} className='flex items-center gap-2 w-fit cursor-pointer hover:bg-blue-50 p-2 rounded text-blue-600'>
                                                            <Mail className='w-4 h-4' />
                                                            <span className='text-sm'>Send Email</span>
                                                        </div>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle>Send Application Response</DialogTitle>
                                                        </DialogHeader>
                                                        <form onSubmit={handleSendReply} className='space-y-4'>
                                                            <div>
                                                                <label className='text-sm font-medium'>Applicant: {item?.applicant?.fullname}</label>
                                                            </div>
                                                            <div>
                                                                <label className='text-sm font-medium block mb-2'>Status</label>
                                                                <select
                                                                    value={replyStatus}
                                                                    onChange={(e) => setReplyStatus(e.target.value)}
                                                                    className='w-full border rounded px-3 py-2'
                                                                >
                                                                    <option>Accepted</option>
                                                                    <option>Rejected</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className='text-sm font-medium block mb-2'>Message (Optional)</label>
                                                                <textarea
                                                                    value={replyMessage}
                                                                    onChange={(e) => setReplyMessage(e.target.value)}
                                                                    placeholder='Add a custom message...'
                                                                    rows={4}
                                                                    className='w-full border rounded px-3 py-2'
                                                                />
                                                            </div>
                                                            <Button
                                                                type='submit'
                                                                disabled={isLoadingReply}
                                                                className='w-full bg-blue-600 hover:bg-blue-700'
                                                            >
                                                                {isLoadingReply ? 'Sending...' : 'Send Email'}
                                                            </Button>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable