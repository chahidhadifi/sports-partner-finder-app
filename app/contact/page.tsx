import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div className="bg-gray-100">
      <Navbar currentPage="Contact" />
      <section className="p-6 text-gray-800">
        <form
          noValidate
          className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow bg-gray-50"
        >
          <h2 className="w-full text-3xl font-bold leading-tight">
            Contact us
          </h2>
          <div>
            <label htmlFor="name" className="block mb-1 ml-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              required
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 bg-gray-100 focus:ring-lime-600"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 ml-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              required
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 bg-gray-100 focus:ring-lime-600"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 ml-1">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Message..."
              className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 bg-gray-100 focus:ring-lime-600"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 text-gray-50 bg-lime-600 focus:ring-lime-600 hover:ring-lime-600"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
