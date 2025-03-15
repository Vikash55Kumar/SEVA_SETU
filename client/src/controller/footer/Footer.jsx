import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white text-sm mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold">Seva Setu</h2>
            <p className="mt-2 text-gray-300 text-justify leading-relaxed">
              A digital initiative to streamline government services and certificate processing efficiently.
            </p>
            <div className="flex space-x-5 mt-4">
              <div className="text-gray-300 hover:text-white"><a href="#"><FaFacebook size={28} /></a> </div>
              <div className="text-gray-300 hover:text-white"><a href="#"><FaTwitter size={28} /></a> </div>
              <div className="text-gray-300 hover:text-white"><a href="https://www.linkedin.com/in/software-enginner-vikash/"><FaLinkedin size={28} /></a> </div>
              <div><a href="https://www.youtube.com/watch?v=IHYBX0qE9ZU" className=" hover:text-white cursor-pointer"><FaYoutube size={28} /></a> </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold border-b border-gray-400 pb-2">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Policies (For Razorpay Verification) */}
          <div>
            <h3 className="text-lg font-semibold border-b border-gray-400 pb-2">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/term" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="/refund" className="hover:underline">Refund Policy</a></li>
              <li><a href="/digitalPolicy" className="hover:underline">Digital Delivery Policy</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold border-b border-gray-400 pb-2">Contact</h3>
            <p className="mt-3 text-gray-300">Govt. Service Center, New Delhi, India</p>
            <p>Email: <a href="mailto:support@sevasetu.com" className="underline">sevasetuteam@gmail.com</a></p>
            <p>Phone: +91 8404858563</p>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-400 mt-6 pt-4 text-center text-gray-300">
          © {new Date().getFullYear()} Seva Setu | Government of India Initiative
        </div>
      </div>
    </footer>
  );
};

export default Footer;
