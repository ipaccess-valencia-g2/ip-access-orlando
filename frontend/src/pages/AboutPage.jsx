import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          ConnectOrlando is a digital solution created in collaboration with the City of Orlando to streamline
          the process of loaning out community tech devices. We aim to replace outdated pen-and-paper systems
          with a centralized, user-friendly web and mobile platform that makes tech more accessible to residents.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Who It's For</h2>
        <p className="text-gray-700 mb-4">
            This platform is designed to support Orlando residents, local community centers, and city administrators by providing
            a transparent and efficient system for managing device reservations and checkouts.
        </p>

        <p className="text-gray-700 mb-2">
            ConnectOrlando is currently being piloted in collaboration with the following City of Orlando community centers and service facilities:
        </p>

        <ul className="list-disc list-inside text-gray-700 grid sm:grid-cols-2 lg:grid-cols-3 gap-y-1">
            <li>Callahan Neighborhood Center</li>
            <li>Hankins Park Neighborhood Center</li>
            <li>Northwest Neighborhood Center</li>
            <li>Rosemont Neighborhood Center</li>
            <li>Smith Neighborhood Center</li>
            <li>Citrus Square Neighborhood Center</li>
            <li>Engelwood Neighborhood Center</li>
            <li>Jackson Neighborhood Center</li>
            <li>L Claudia Allen Senior Center</li>
            <li>Grand Avenue Neighborhood Center</li>
            <li>Ivey Lane Neighborhood Center</li>
            <li>Langford Park Neighborhood Center</li>
            <li>Rock Lake Neighborhood Center</li>
            <li>Wadeview Neighborhood Center</li>
            <li>Dover Shores Neighborhood Center</li>
            <li>RISE Employment Training Facility</li>
            <li>Hispanic Office for Local Assistance</li>
        </ul>
        </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Find A Community Center Near You</h2>
        <div className="w-full" style={{ height: '600px', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1JvP_hYiEtf_Y0KSGCZwYFBpvvdvhwR4&ehbc=2E312F"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Find A Community Center Near You"
            style={{ border: 0 }}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
        <p className="text-gray-700 mb-4">
            ConnectOrlando was built by students enrolled in Software Development Project (CEN-4910C) as part of our senior capstone at Valencia College. This project was made possible through a partnership with the City of Orlando.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
                <a
                href="https://www.linkedin.com/in/dangelo-t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                >
                LaVonne Patoir
                </a>
            {" "}
            (co-lead)
            </li>
            <li>
                <a
                href="https://github.com/d-angelotorres"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                >
                D’Angelo Torres
                </a>
            {" "}
            (co-lead)
            </li>
            <li><a href="https://github.com/AAbukhdair" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Adam Abukhdair</a></li>
            <li><a href="https://github.com/Braeden03" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Braeden Carlise</a></li>
            <li><a href="http://github.com/ceccontreras" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Carlos Campos</a></li>
            <li><a href="https://github.com/cPassno" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Colin Passno</a></li>
            <li><a href="https://github.com/uddinhammad1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Hammad Udin</a></li>
            <li><a href="https://github.com/Rustly" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Jackson Martzahn</a></li>
            <li><a href="https://github.com/kevinBonifacio" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Kevin Bonifacio</a></li>
            <li><a href="https://mpasquale.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">McKenna Pasquale</a></li>
            <li><a href="https://github.com/RyanH3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        Ryan Williams</a></li>
        </ul>

        <div className="mt-6">
            <h3 className="text-xl font-medium mb-1">Advisor</h3>
            <p className="text-gray-700">
            Mary Walauskis – Professor, Software Development Project (CEN-4910C)
            </p>
        </div>
        </section>
    </div>
  );
};

export default AboutPage;
