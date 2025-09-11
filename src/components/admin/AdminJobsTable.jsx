import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobsTable = () => {
  const { loading } = useGetAllAdminJobs(1, 10);
  const navigate = useNavigate();
  const { allAdminJobs = [], searchJobByText = "" } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      const companyName = job.company?.name?.toLowerCase() || "";
      const roleName = job.title?.toLowerCase() || "";
      const keyword = searchJobByText.toLowerCase();
      return companyName.includes(keyword) || roleName.includes(keyword);
    });
    setFilteredJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading jobs...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white rounded-2xl shadow-lg border border-gray-200">
        <TableCaption className="text-gray-500 text-sm">
          All posted jobs in your portal
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100">
            <TableHead className="text-left px-4 py-3 text-blue-800 font-semibold">Company Name</TableHead>
            <TableHead className="text-left px-4 py-3 text-blue-800 font-semibold">Role</TableHead>
            <TableHead className="text-left px-4 py-3 text-blue-800 font-semibold">Date</TableHead>
            <TableHead className="text-right px-4 py-3 text-blue-800 font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-400">
                No jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job, index) => (
              <TableRow
                key={job._id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-blue-50/50" : "bg-cyan-50/50"
                } hover:bg-gradient-to-r hover:from-blue-100 hover:via-cyan-100 hover:to-teal-100`}
              >
                <TableCell className="px-4 py-3 font-medium text-gray-800">{job.company?.name || "Unnamed Company"}</TableCell>
                <TableCell className="px-4 py-3 font-semibold text-gray-700">{job.title}</TableCell>
                <TableCell className="px-4 py-3 text-gray-600">
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2 rounded-xl shadow-md bg-white border border-gray-200 flex flex-col gap-2">
                      <div
                        onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                        className="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer bg-gradient-to-r from-blue-100 to-blue-200 hover:scale-105 transition-transform"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer bg-gradient-to-r from-green-100 to-green-200 hover:scale-105 transition-transform"
                      >
                        <Eye className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
