import React, { useContext, useState, useRef } from "react";
import axios from "axios";
// import Navbar from "./Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { ProfileContext } from "./Pages/ProfileContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Wireframe, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- 3D Background Element (Updated for Professional Aesthetic) ---
function AbstractGeometry() {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[4, 0, -2]} scale={1.5}>
        <torusKnotGeometry args={[2, 0.4, 128, 32]} />
        <MeshTransmissionMaterial
          background={new THREE.Color("#0A0A0A")}
          color="#9DFF13" // Vibrant professional green
          transmission={0.9}
          thickness={0.5}
          roughness={0.2}
          ior={1.5}
        />
        <Wireframe
          simplify={true}
          stroke={"#9DFF13"}
          thickness={0.02}
          dash={false}
          opacity={0.15}
          transparent
        />
      </mesh>
    </Float>
  );
}

const ResumeParser = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { name, setName, jobRole, setJobRole, experience, setExperience } =
    useContext(ProfileContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const toastId = toast.loading("Submitting profile...");

//     try {
//       const data = { name, jobRole, experience };

//       const formData = new FormData();

//       formData.append("data", JSON.stringify(data));

//       if (resume) {
//         formData.append("resume", resume);
//       }

//       const res = await axios.post(
//         "http://localhost:5000/api/upload/uploadResume",
//         formData,
//         { withCredentials: true },
//       );

//       toast.success("Profile submitted successfully", {
//         id: toastId,
//       });

//       console.log("SUCCESS:", res.data);

//       navigate("/jobs");
//     } catch (error) {
//       // 403 specific handling
//       if (error.response?.status === 403) {
//         toast.error("Admins are not allowed to upload resumes", {
//           id: toastId,
//         });
//       } else {
//         toast.error(
//           error.response?.data?.message || "Profile submission failed",
//           {
//             id: toastId,
//           },
//         );
//       }

//       console.error("ERROR:", error);
//     }
//   };

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] font-sans overflow-hidden text-white selection:bg-[#9DFF13]/30">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={2}
            color="#9DFF13"
          />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
          <AbstractGeometry />
        </Canvas>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_100%)] opacity-90"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 pb-20 flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column: Clean, Professional Typography */}
          <div className="w-full lg:w-5/12 pointer-events-none">
            <div className="inline-flex items-center gap-2 mb-6 pointer-events-auto bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#9DFF13] animate-pulse"></div>
              <span className="text-xs font-medium text-white/80">
                Step 1: Setup Profile
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              Build your <br />
              <span className="text-[#9DFF13]">professional</span> identity.
            </h1>

            <p className="text-base md:text-lg text-white/60 max-w-md font-light mt-6 leading-relaxed pointer-events-auto">
              Upload your resume and details to let CampusOS match you with the
              best career opportunities and personalized roadmaps.
            </p>
          </div>

          {/* Right Column: Modern SaaS Form */}
          <div className="w-full lg:w-7/12 pointer-events-auto relative">
            <form
              onSubmit={handleSubmit}
              className="backdrop-blur-2xl bg-[#ffffff08] border border-white/10 p-8 md:p-10 shadow-2xl relative overflow-hidden rounded-3xl"
            >
              <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
                <h2 className="text-2xl font-semibold text-white">
                  Personal Details
                </h2>
                <span className="text-sm font-medium text-[#9DFF13]">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input: Name */}
                <div className="group relative">
                  <label className="text-sm font-medium text-white/70 mb-2 block group-focus-within:text-[#9DFF13] transition-colors">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#0A0A0A]/50 border border-white/10 px-4 py-3.5 focus:outline-none focus:border-[#9DFF13] focus:ring-1 focus:ring-[#9DFF13] transition-all text-base text-white rounded-xl placeholder-white/20"
                    placeholder="e.g. Jane Doe"
                  />
                </div>

                {/* Input: Job Role */}
                <div className="group relative">
                  <label className="text-sm font-medium text-white/70 mb-2 block group-focus-within:text-[#9DFF13] transition-colors">
                    Desired Job Role
                  </label>
                  <input
                    type="text"
                    name="jobRole"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    required
                    className="w-full bg-[#0A0A0A]/50 border border-white/10 px-4 py-3.5 focus:outline-none focus:border-[#9DFF13] focus:ring-1 focus:ring-[#9DFF13] transition-all text-base text-white rounded-xl placeholder-white/20"
                    placeholder="e.g. Frontend Engineer"
                  />
                </div>

                {/* Input: Experience (Full Width) */}
                <div className="group relative md:col-span-2">
                  <label className="text-sm font-medium text-white/70 mb-2 block group-focus-within:text-[#9DFF13] transition-colors">
                    Experience Level
                  </label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      required
                      className="w-full bg-[#0A0A0A]/50 border border-white/10 px-4 py-3.5 focus:outline-none focus:border-[#9DFF13] focus:ring-1 focus:ring-[#9DFF13] transition-all text-base text-white rounded-xl appearance-none cursor-pointer"
                    >
                      <option
                        value=""
                        disabled
                        className="bg-[#0A0A0A] text-white/50"
                      >
                        Select your level...
                      </option>
                      <option value="entry" className="bg-[#0A0A0A]">
                        Entry Level (0-1 years)
                      </option>
                      <option value="junior" className="bg-[#0A0A0A]">
                        Junior (1-3 years)
                      </option>
                      <option value="mid" className="bg-[#0A0A0A]">
                        Mid-Level (3-5 years)
                      </option>
                      <option value="senior" className="bg-[#0A0A0A]">
                        Senior (5+ years)
                      </option>
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 group-focus-within:text-[#9DFF13]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* File Upload Zone */}
                <div className="md:col-span-2 mt-2">
                  <label className="text-sm font-medium text-white/70 mb-2 block">
                    Resume Upload
                  </label>
                  <div
                    className={`relative w-full border-2 border-dashed transition-all duration-300 rounded-xl flex flex-col items-center justify-center py-10 px-6 text-center cursor-pointer overflow-hidden
                      ${isDragging || resume ? "border-[#9DFF13] bg-[#9DFF13]/5" : "border-white/20 bg-[#0A0A0A]/30 hover:border-white/40"}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      setResume(e.dataTransfer.files[0]);
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files[0])}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {resume ? (
                      <div className="flex items-center gap-3 text-[#9DFF13]">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="bg-[#9DFF13]/20 p-1 rounded-full"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span className="font-medium text-base text-white">
                          {resume.name}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 bg-white/5">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-white/60"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                          </svg>
                        </div>
                        <p className="text-base font-medium text-white/90">
                          Click or drag your file here
                        </p>
                        <p className="text-xs text-white/40 mt-1">
                          Supports PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="mt-8 flex justify-end pt-6">
                <button
                  type="submit"
                  className="group w-full md:w-auto px-8 py-3.5 bg-[#9DFF13] text-[#0A0A0A] font-semibold text-sm hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 rounded-full shadow-[0_0_20px_rgba(157,255,19,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                >
                  <span>Save Profile & Continue</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResumeParser;
