import { useState } from "react";


const backendurl = `${import.meta.env.VITE_BACKEND_URL}/enquiry`;


function EnquiryForm() {
  // State to manage form fields
  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    category: "Service Request",
    message: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for submit
  const [responseMessage, setResponseMessage] = useState(""); // To display success/error messages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(backendurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // eslint-disable-next-line no-unused-vars
        const result = await response.json();
        setResponseMessage("Enquiry submitted successfully!");
      } else {
        setResponseMessage("Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-700">
        <form
          className="w-full max-w-md p-7 bg-white rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4">Enquiry Form</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded"
              placeholder="Please enter your name"
              required
              minLength={2}
              maxLength={60}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="emailAddress" className="block text-sm font-medium mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded"
              placeholder="Please enter your email"
              required
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category:
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Service Request">Service Request</option>
              <option value="Feedback">Feedback</option>
              <option value="Complaint">Complaint</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded"
              placeholder="Please enter your message"
              required
              rows={4}
              minLength={3}
              maxLength={300}
              autoComplete="off"
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {responseMessage && (
            <p
              className={`mt-4 text-sm font-medium ${
                responseMessage.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {responseMessage}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default EnquiryForm;
