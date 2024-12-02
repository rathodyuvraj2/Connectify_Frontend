import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createCertification,updateCertification } from "../../services/api";

const CertificationModal = ({ certification, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    description: "",
    skills: [],
  });

  useEffect(() => {
    if (certification) {
      setFormData({
        ...certification,
        issueDate: certification.issueDate.split("T")[0],
        expiryDate: certification.expiryDate?.split("T")[0] || "",
        skills: certification.skills.join(", "),
      });
    }
  }, [certification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const userId = localStorage.getItem("UserId");
    const user = localStorage.getItem('user');
    const userResponse = JSON.parse(user);
    const userId = userResponse.id;
    
    const processedData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      user: userId,
    };

    try {
      if (certification) {
        await updateCertification(certification._id, processedData);
      } else {
        await createCertification(processedData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving certification:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {certification ? "Edit Certification" : "Add New Certification"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Certification Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issuing Organization
            </label>
            <input
              type="text"
              value={formData.issuer}
              onChange={(e) =>
                setFormData({ ...formData, issuer: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issue Date
              </label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) =>
                  setFormData({ ...formData, issueDate: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Credential ID
              </label>
              <input
                type="text"
                value={formData.credentialId}
                onChange={(e) =>
                  setFormData({ ...formData, credentialId: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Credential URL
              </label>
              <input
                type="url"
                value={formData.credentialUrl}
                onChange={(e) =>
                  setFormData({ ...formData, credentialUrl: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {certification ? "Update Certification" : "Add Certification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationModal;
