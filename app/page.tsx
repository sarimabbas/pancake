import Link from "next/link";

export default function Page() {
  return (
    <div className="relative w-full overflow-hidden min-h-screen grid place-items-center">
      <header className="w-full py-10 md:py-14 xl:py-18">
        <div className="container flex flex-col items-center px-4 space-y-2 md:space-y-3">
          <img src="/logo.png" className="h-36" />
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Your personal changelog
            </h1>
            <br />
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Never lose track of all the great work you do. Write weekly
              snippets, and use AI to generate portable resumes.
            </p>
          </div>
          <br />
          <div className="w-full max-w-[400px] space-y-2">
            <Link
              className="flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/auth/login"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
