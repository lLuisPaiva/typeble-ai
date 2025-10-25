export default function Footer() {
  return (
    <footer className="py-7 pb-5 border-t border-neutral-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold tracking-tighter text-white">
              TYPEBLE
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:items-center">
            <nav className="flex gap-6">
              <a href="#services" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Services
              </a>
              <a href="#case-studies" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Case Studies
              </a>
              <a href="#process" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Process
              </a>
              <a href="#philosophy" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Philosophy
              </a>
              <a href="#engagement" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Engagement
              </a>
            </nav>
            <div className="h-6 w-px bg-neutral-800 hidden md:block"></div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/typeble" className="text-neutral-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.983 3.5a2.5 2.5 0 11.001 5.001A2.5 2.5 0 014.983 3.5zM3 9.429h3.967V21H3V9.429zM9.431 9.429h3.806v1.582h.054c.53-1.005 1.828-2.066 3.764-2.066 4.021 0 4.764 2.65 4.764 6.098V21h-3.967v-5.421c0-1.292-.024-2.955-1.802-2.955-1.804 0-2.079 1.408-2.079 2.86V21H9.431V9.429z" />
                </svg>
              </a>
              <a href="https://github.com/typeble" className="text-neutral-400 hover:text-white transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Typeble. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
