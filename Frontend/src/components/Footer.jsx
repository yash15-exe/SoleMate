import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 font-poppins">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">SoleMate</h2>
          <p className="mt-2 text-gray-400">Your perfect shoe destination</p>
        </div>
        <div className="flex space-x-8 mb-4 md:mb-0">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/" className="hover:text-gray-400">Shop</a>
          <a href="/aboutUs" className="hover:text-gray-400">About</a>
          <a href="/contactUs" className="hover:text-gray-400">Contact</a>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h21.351C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0zm-2.538 22.675h-3.847v-6.169c0-1.471-.026-3.366-2.052-3.366-2.054 0-2.368 1.598-2.368 3.257v6.278h-3.847V9h3.697v1.866h.051c.516-.976 1.775-2.007 3.654-2.007 3.905 0 4.625 2.571 4.625 5.912v6.904z"/>
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.918 2.201-4.918 4.917 0 .385.043.761.127 1.122-4.084-.205-7.702-2.16-10.125-5.134-.424.725-.666 1.561-.666 2.457 0 1.695.864 3.191 2.177 4.067-.803-.025-1.56-.247-2.22-.616v.062c0 2.367 1.684 4.342 3.918 4.789-.41.111-.843.171-1.287.171-.316 0-.624-.03-.925-.088.625 1.953 2.441 3.377 4.588 3.415-1.68 1.318-3.801 2.105-6.104 2.105-.396 0-.787-.023-1.174-.068 2.178 1.396 4.765 2.211 7.548 2.211 9.057 0 14.009-7.506 14.009-14.009 0-.213-.004-.426-.013-.637.964-.695 1.8-1.562 2.462-2.549z"/>
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c-5.468 0-9.837 4.368-9.837 9.837 0 4.347 2.784 8.016 6.64 9.344.485.09.66-.21.66-.465 0-.23-.008-.839-.013-1.647-2.693.587-3.262-1.299-3.262-1.299-.442-1.123-1.08-1.422-1.08-1.422-.884-.604.067-.591.067-.591.975.068 1.487 1.002 1.487 1.002.867 1.484 2.274 1.055 2.83.806.087-.63.34-1.054.617-1.297-2.15-.244-4.408-1.074-4.408-4.787 0-1.057.376-1.922.99-2.598-.099-.243-.428-1.223.093-2.549 0 0 .806-.258 2.64.986a9.158 9.158 0 012.405-.324c.815.004 1.64.11 2.405.324 1.832-1.244 2.636-.986 2.636-.986.524 1.326.195 2.306.096 2.549.616.676.99 1.54.99 2.598 0 3.721-2.262 4.54-4.417 4.778.35.302.664.899.664 1.812 0 1.309-.012 2.368-.012 2.692 0 .258.172.559.67.464 3.859-1.332 6.639-4.997 6.639-9.342 0-5.468-4.368-9.837-9.837-9.837z"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} SoleMate. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
