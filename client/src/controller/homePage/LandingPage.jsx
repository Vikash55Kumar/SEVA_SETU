import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero-img.png"
import aboutImg from "../../assets/about-img.png"
import yashChoudhry from "../../assets/team/YASH-CHAUDHARY-IAS.webp"
import ankitaAnand from "../../assets/team/ANKITA-ANAND-IAS.webp"
import ashisChandra from "../../assets/team/Ashish-Chandra-Verma-IAS.webp"
import rajatMehta from "../../assets/team/rajatMehta.jpg"

const LandingPage = () => {

  const officials = [
    {
      name: "Yash Choudhary",
      position: "District Collector",
      image: yashChoudhry,
    },
    {
      name: "Mis Ankita Anand",
      position: "District Revenue Officer", 
      image: ankitaAnand,
    },
    {
      name: "Rajat Mehrotra",
      position: "Sub Divisional Collector",
      image: rajatMehta,
    },
    {
      name: "Dr. Ashish Chandra Verma, IAS",
      position: "Revenue Divisional Officer",
      image: ashisChandra
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="text-center py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Seva Setu</h1>
          <p className="mt-4 text-gray-600">A real-time monitoring system for efficient document verification and resource allocation.</p>

          <img src={heroImg} alt="Hero" className="w-full mt-6" />
          <p className="mt-8 text-gray-600"> 
            Seva Setu is a real-time monitoring system designed to streamline the issuance of caste and other certificates by the Revenue Department. 
            It provides dynamic resource allocation, real-time alerts, and predictive analytics to improve efficiency and reduce backlogs across subdivisions.
          </p>
        </div>
      </section>
        
      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-16 mt-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Key Features</h2>
          <p className="text-gray-600 mt-2">Seva Setu integrates cutting-edge features for seamless user experience.</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { title: "One Time Registration", img: "/cloud-computing.svg", desc: "Simplified user verification process." },
            { title: "Dynamic Resource Allocation", img: "/vector.svg", desc: "Smart distribution of resources." },
            { title: "Centralized Dashboard", img: "/design-tool.svg", desc: "Manage all operations in one place." },
            { title: "Real-Time Monitoring", img: "/asteroid.svg", desc: "Live tracking of requests and services." },
            { title: "Predictive Analytics", img: "/asteroid.svg", desc: "Data insights for better decisions." },
            { title: "App Store Support", img: "/cloud-computing.svg", desc: "Available on web and mobile." },
            { title: "User-Friendly Interface", img: "/pixel.svg", desc: "Simple and easy-to-use design." },
            { title: "Easy Document Verification", img: "/code.svg", desc: "Quick and secure verification process." },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <img src={feature.img} alt={feature.title} className="w-16 mx-auto" />
              <h4 className="text-xl font-semibold mt-4 text-gray-800">{feature.title}</h4>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* mobile */}
      <section id="about-us" className="max-w-7xl mx-auto px-6 mt-16 lg:px-16">
        <div className="flex flex-col items-center ">

            <div className="flex justify-center">
            <img src={aboutImg} alt="About Seva Setu" className="w-5/12 h-[500px] ml-16 rounded-lg shadow-lg" />
            <div className="mt-12 ml-8">
                <span className="text-4xl mb-4"><b className="text-gray-800">SEVA SETU</b> <b className="font-thin text-gray-800">UI design <br/> mobile</b></span>
                <p className="text-gray-600 leading-relaxed mt-4">
                    The mobile application will be develop for the same web applicatiion for the easy implementation of system resources and documents verifications
                </p>
                <ol className="mt-20 space-y-4 text-gray-700">
                <li> <strong>Creative Design</strong> – Intuitive UI for all users.</li>
                <li> <strong>Retina Ready</strong> – Optimized visuals for clarity.</li>
                <li> <strong>Easy to Use</strong> – Simple and efficient navigation.</li>
                <li> <strong>Unlimited Features</strong> – Built to scale with user needs.</li>
                </ol>
            </div>
          </div>
          <div>


          </div>
        </div>
      </section>

      {/* Governments officials */}
      <section id="team" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Government Officials</h2>
          <p className="text-gray-600 mt-2">The working hierarchy of the system in New Delhi</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {officials.map((official, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
                <img src={official.image} alt={official.name} className="w-full h-56 object-cover" />
                <div className="p-4 text-center">
                  <h4 className="text-xl font-semibold text-gray-800">{official.name}</h4>
                  <p className="text-gray-600">{official.position}</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section id="video" class="text-center w-full wow fadeInUp">
        <div class="overlay">
          <h2 className="text-3xl font-bold my-4 text-gray-800">Gallery Video Seva Setu</h2>
          <div class="flex container-fluid justify-center container-full">
            <div class="row">
              {/* <!-- Video Element --> */}
              <video autoPlay  loop muted controls class="w-full max-w-4xl rounded-lg shadow-lg">
                <source src="/sevaSetu.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
