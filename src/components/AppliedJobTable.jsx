// components/AppliedJobTable.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((state) => state.job);
  const appliedJobs = allAppliedJobs || [];

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // ✅ Status color mapping
  const getStatusColor = (status) => {
    if (!status) return "bg-yellow-100 text-yellow-700 border border-yellow-300"; // pending default
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-400 text-green-900 border border-green-300";
      case "rejected":
        return "bg-red-400 text-red-900 border border-red-300";
      default:
        return "bg-yellow-400 text-yellow-900 border border-yellow-300"; // pending
    }
  };

  // Filter logic
  const filteredJobs = appliedJobs.filter((job) => {
    const role = job.job?.title || "";
    const companyName = job.job?.company?.name || "";
    const status = job.status || "pending";

    const matchesSearch =
      role.toLowerCase().includes(search.toLowerCase()) ||
      companyName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl shadow-lg">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by role or company..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none shadow-sm bg-white"
        />
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/4 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm cursor-pointer bg-white"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <Table className="rounded-xl overflow-hidden shadow-md bg-white">
        <TableCaption className="text-gray-500 italic">
          A list of jobs you have applied for
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200">
            <TableHead className="font-semibold text-gray-800">Date</TableHead>
            <TableHead className="font-semibold text-gray-800">Job Role</TableHead>
            <TableHead className="font-semibold text-gray-800">Company</TableHead>
            <TableHead className="text-right font-semibold text-gray-800">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentJobs.length > 0 ? (
            currentJobs.map((job, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 transition-all duration-200 cursor-pointer"
              >
                <TableCell className="text-gray-700">
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium text-gray-800 hover:text-purple-600 hover:underline cursor-pointer transition-colors duration-200">
                  {job.job?.title || "N/A"}
                </TableCell>
                <TableCell className="text-gray-600 hover:text-blue-600 hover:underline cursor-pointer transition-colors duration-200">
                  {job.job?.company?.name || "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${getStatusColor(job.status)} px-3 py-1 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200`}
                  >
                    {job.status?.charAt(0).toUpperCase() + job.status?.slice(1) || "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500 py-4">
                No jobs found 😢
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {filteredJobs.length > jobsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="cursor-pointer"
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(index + 1)}
              className={`cursor-pointer ${
                currentPage === index + 1
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "hover:bg-purple-100"
              }`}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="cursor-pointer"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppliedJobTable;
