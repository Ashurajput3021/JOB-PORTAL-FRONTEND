import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Loader2, X } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(user?.profile?.profilePhoto || "");
  const [resume, setResume] = useState(null);

  useEffect(() => {
    setPreviewPhoto(user?.profile?.profilePhoto || "");
  }, [user]);

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const photoChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const resumeChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setResume(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (input[key]) formData.append(key, input[key]);
    });
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    if (resume) formData.append("resume", resume);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white p-6 rounded-3xl shadow-2xl overflow-y-auto max-h-[85vh] ring-1 ring-gray-200 animate-slide-in"
        >
          <DialogHeader className="relative">
            <Dialog.Title className="text-2xl font-bold text-gray-800">
              Update Profile
            </Dialog.Title>
            {/* ✅ Accessibility fix */}
            <Dialog.Description className="text-sm text-gray-500 mt-1">
              Update your personal information and upload your latest resume.
            </Dialog.Description>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={22} />
            </button>
          </DialogHeader>

          <form onSubmit={submitHandler} className="mt-6 space-y-4">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={previewPhoto || "/default-avatar.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={photoChangeHandler}
                className="cursor-pointer"
              />
            </div>

            {/* Inputs */}
            <Input
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <Input
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              id="bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 resize-none"
              placeholder="Write a short bio..."
              rows={3}
            />
            <Input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              placeholder="React, Node.js, MongoDB"
              className="w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
            />

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Resume (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={resumeChangeHandler}
                className="cursor-pointer"
              />
              {user?.profile?.resume && !resume && (
                <a
                  href={`${user.profile.resume}?dl=1`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm underline mt-1 block hover:text-indigo-700"
                >
                  View Current Resume
                </a>
              )}
            </div>

            <DialogFooter>
              {loading ? (
                <Button className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg animate-pulse">
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UpdateProfileDialog;
