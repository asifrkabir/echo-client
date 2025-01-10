import { Mail, Phone, MapPin } from "lucide-react";

const CommonFooter = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black py-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Title */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Pawfect
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your trusted pet care platform.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex items-center">
              <Mail className="text-[#FCBE4F] mr-2" size={20} />
              <a
                href="mailto:support@pawfect.com"
                className="text-gray-700 dark:text-gray-300 hover:text-[#FCBE4F]"
              >
                support@pawfect.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="text-[#FCBE4F] mr-2" size={20} />
              <a
                href="tel:+15551234567"
                className="text-gray-700 dark:text-gray-300 hover:text-[#FCBE4F]"
              >
                +1 (555) 123-4567
              </a>
            </div>
            <div className="flex items-center">
              <MapPin className="text-[#FCBE4F] mr-2" size={20} />
              <span className="text-gray-700 dark:text-gray-300">
                123 Pawfect Street, Pet City
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 border-t border-gray-300 dark:border-gray-600 pt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Pawfect. All rights reserved |
            Asif Rezwan Kabir.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CommonFooter;
