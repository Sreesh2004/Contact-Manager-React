import { useState, useContext, useEffect } from 'react';
import ContactContext from '../Context/Contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { current, addContact, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
        photo: '',
        dob: '',
        bloodGroup: '',
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
    photo: '',
    dob: '',
    bloodGroup: '',
  });

  const { name, email, phone, type, photo, dob, bloodGroup } = contact;

  const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
      photo: '',
      dob: '',
      bloodGroup: '',
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContact({ ...contact, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-center m-2 xs:mx-5 sm:m-3 sm:mx-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-extrabold text-center text-white lg:text-3xl md:text-xl">
          {current ? 'Edit Contact' : 'Add Contact'}
        </h2>
      </div>
      <div className="mt-4 shadow-md sm:mx-auto sm:w-full hover:shadow-sm sm:max-w-md">
        <div className="px-4 py-8 transition duration-500 bg-gray-800 hover:opacity-95 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit} autoComplete="off">
            {/* Round Photo Input */}
            <div className="flex justify-center">
              <label className="relative w-24 h-24 overflow-hidden rounded-full cursor-pointer bg-gray-700 hover:opacity-90">
                {photo ? (
                  <img
                    src={photo}
                    alt="Contact"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                    Add Photo
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Name Input */}
            <div>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={onChange}
                required
                placeholder="Name"
                className="block w-full px-3 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Other Inputs (Email, Phone, etc.) */}
            {/* Email Input */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                required
                placeholder="Email"
                className="block w-full px-3 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Phone Input */}
            <div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={onChange}
                required
                placeholder="Phone"
                className="block w-full px-3 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <input
                id="dob"
                name="dob"
                type="date"
                value={dob}
                onChange={onChange}
                className="block w-full px-3 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Blood Group Dropdown */}
            <div>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={bloodGroup}
                onChange={onChange}
                className="block w-full px-3 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Radio Buttons for Type */}
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  id="type-personal"
                  name="type"
                  type="radio"
                  value="personal"
                  checked={type === 'personal'}
                  onChange={onChange}
                  className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-white">Personal</span>
              </label>
              <label className="flex items-center ml-4">
                <input
                  id="type-professional"
                  name="type"
                  type="radio"
                  value="professional"
                  checked={type === 'professional'}
                  onChange={onChange}
                  className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-white">Professional</span>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-400 border border-transparent rounded-md shadow-sm hover:bg-indigo-300 focus:outline-none"
              >
                {current ? 'Update Contact' : 'Add Contact'}
              </button>
            </div>

            {/* Clear Button */}
            {current && (
              <div>
                <button
                  type="button"
                  onClick={clearCurrent}
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-400 border border-transparent rounded-md shadow-sm hover:bg-indigo-300 focus:outline-none"
                >
                  Clear
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
