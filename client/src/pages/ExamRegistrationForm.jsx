import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ExamRegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    mobilePrimary: '',
    mobileReentered: '',
    mobileAlternate: '',
    country: '',
    state: '',
    city: '',
    idProofType: 'Aadhar Card',
    photo: null,
    signature: null,
    idProof: null,
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    try {
      await axios.post('http://localhost:8000/examRegistrations', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Registration submitted!');
      navigate("/register_success")
      toast.success("Registeration success")
      
    } catch (err) {
      alert('Error submitting form. ' + err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 mt-10 rounded shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Exam Registration</h2>

      <input
        type="text"
        name="name"
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="email"
        onChange={handleChange}
        placeholder="Enter Email"
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        name="dob"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="gender"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="text"
        name="mobilePrimary"
        placeholder="Mobile"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="mobileReentered"
        placeholder="Re-enter Mobile"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="mobileAlternate"
        placeholder="Alternate Mobile"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="country"
        placeholder="Country"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="idProofType"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="Aadhar Card">Aadhar Card</option>
        <option value="Voter’s ID">Voter’s ID</option>
        <option value="Driver’s License">Driver’s License</option>
      </select>

      <div className="mt-4">
        <label className="block mb-1 font-medium">Passport Photo:</label>
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-medium">Signature:</label>
        <input
          type="file"
          name="signature"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-medium">ID Proof:</label>
        <input
          type="file"
          name="idProof"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-6"
      >
        Submit
      </button>
    </form>
  );
};

export default ExamRegistrationForm;
