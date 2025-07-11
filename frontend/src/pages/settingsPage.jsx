import { useState } from "react";

import { changePassword, changeName, changeLastName } from "../services/settingsService";

export default function SettingsPage() {
  const [openSection, setOpenSection] = useState(null);
  const [status, setStatus] = useState("");

  // States for each section
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
    setStatus(""); // clear status when switching
  };

  return (
    <div className="min-h-screen bg-[#0b1e2d] flex justify-start px-8 py-12">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-white mb-4">Settings</h1>

        <SettingsSection
          title="Change Password"
          isOpen={openSection === "password"}
          onClick={() => toggleSection("password")}
        >
          <InputField
            label="Current Password"
            type="password"
            value={passwordData.current}
            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
          />
          <InputField
            label="New Password"
            type="password"
            value={passwordData.new}
            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={passwordData.confirm}
            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
          />
          <SaveButton
            onSave={() => changePassword(passwordData)}
            setStatus={setStatus}
          />
        </SettingsSection>

        <SettingsSection
          title="Change First Name"
          isOpen={openSection === "firstname"}
          onClick={() => toggleSection("firstname")}
        >
          <InputField
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <SaveButton
            onSave={() => changeName(firstName)}
            setStatus={setStatus}
          />
        </SettingsSection>

        <SettingsSection
          title="Change Last Name"
          isOpen={openSection === "lastname"}
          onClick={() => toggleSection("lastname")}
        >
          <InputField
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <SaveButton
            onSave={() => changeLastName(lastName)}
            setStatus={setStatus}
          />
        </SettingsSection>

        {status && <p className="text-sm text-white mt-4">{status}</p>}
      </div>
    </div>
  );
}

function SettingsSection({ title, isOpen, onClick, children }) {
  return (
    <div className="bg-[#132e42] rounded-lg overflow-hidden border border-[#224766]">
      <div
        onClick={onClick}
        className="cursor-pointer px-5 py-4 text-white font-semibold bg-[#0b1e2d] hover:bg-[#173652] transition duration-200"
      >
        {title} <span className="float-right">{isOpen ? "▲" : "▼"}</span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out px-5 ${
          isOpen ? "max-h-[500px] py-4" : "max-h-0 overflow-hidden py-0"
        }`}
      >
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

function InputField({ label, type , value , onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        className="w-full px-3 py-2 border border-[#224766] bg-[#132e42] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#2eaefb]"
        required
        value={value} 
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

function SaveButton({ onSave, setStatus }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setStatus("");
    try {
      const response = await onSave();
      if (response.ok) {
        setStatus("Saved successfully.");
      } else {
        setStatus(response.message);
      }
    } catch (err) {
      setStatus("Error saving. Please try again.");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-[#2eaefb] text-white py-2 rounded hover:bg-[#1c8edc] transition duration-200"
    >
      {loading ? "Saving..." : "Save"}
    </button>
  );
}
