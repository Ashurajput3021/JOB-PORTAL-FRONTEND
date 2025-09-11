import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="relative min-h-screen text-gray-800">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_200%] animate-gradient" />

      <Navbar />

      {/* COVER BANNER */}
      <div className="h-34 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative shadow-lg">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        {/* PROFILE IMAGE */}
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img
              src={
                user?.profile?.profilePhoto || "https://github.com/shadcn.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {/* LEFT SIDEBAR */}
        {/* LEFT SIDEBAR */}
        <div className="bg-white/80 border border-gray-200 backdrop-blur-xl shadow-md rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-2">About</h2>
          <p className="text-sm leading-relaxed mb-4">
            {user?.profile?.bio ? (
              user.profile.bio
            ) : (
              <>
                Hi, I’m <span className="font-semibold">{user?.fullname}</span>,
                a passionate {user?.role || "Frontend Developer"} building
                modern web apps.
              </>
            )}
          </p>

          {/* Skills */}
          {user?.profile?.skills?.length > 0 && (
            <>
              <h2 className="text-lg font-bold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 bg-white/80 border border-gray-200 backdrop-blur-xl shadow-lg rounded-2xl p-6 relative">
          {/* Edit Button */}
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="absolute top-4 right-4 hover:scale-105 transition cursor-pointer"
          >
            <Pen className="h-4 w-4" />
          </Button>

          {/* Name & Role */}
          <div className="text-center mb-6">
            <h1 className="font-bold text-2xl mb-1">{user?.fullname}</h1>
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-medium">
                {user?.role || "Frontend Developer"}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 hover:text-purple-500 transition">
              <Mail className="text-purple-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-purple-500 transition">
              <Contact className="text-purple-500" />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Resume Button */}
          {/* Resume Button */}
          {user?.profile?.resume && (
            <div className="flex justify-center mt-4">
              <a
                href={user.profile.resume}
                download // <-- yaha download add kiya
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-md hover:scale-105 transition text-sm"
              >
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-6">📌 Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />

      {/* Gradient Animation */}
      <style>{`
        .animate-gradient {
          animation: gradientMove 8s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Profile;
