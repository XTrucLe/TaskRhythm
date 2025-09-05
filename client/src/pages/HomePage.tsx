import Button from "../components/Button";
import Card from "../components/Card";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-indigo-600">TaskRhythm</h1>
        <nav className="space-x-6 text-gray-700">
          <a href="#features" className="hover:text-indigo-600">
            Features
          </a>
          <a href="#pricing" className="hover:text-indigo-600">
            Pricing
          </a>
          <a href="#contact" className="hover:text-indigo-600">
            Contact
          </a>
        </nav>
        <Button variant="primary">Get Started</Button>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-5xl font-bold mb-6">
          Organize your study, boost productivity
        </h2>
        <p className="text-lg mb-8 max-w-2xl">
          TaskRhythm helps you manage tasks, collaborate, and stay focused in
          your learning journey.
        </p>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            Start Free Trial
          </Button>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-indigo-600"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-20 px-6 max-w-6xl mx-auto text-center"
      >
        <h3 className="text-3xl font-bold mb-12">
          Everything you need to stay on track
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition">
            <h4 className="font-semibold text-lg mb-2 text-indigo-500">
              Task Management
            </h4>
            <p className="text-gray-600">
              Plan, organize, and never miss a deadline again. A clean and
              intuitive interface keeps your priorities crystal clear.
            </p>
          </Card>
          <Card className="hover:shadow-lg transition">
            <h4 className="font-semibold text-lg mb-2 text-indigo-500">
              Collaboration
            </h4>
            <p className="text-gray-600">
              Create shared study zones where ideas flow freely and teamwork
              feels effortless — no matter where you are.
            </p>
          </Card>
          <Card className="hover:shadow-lg transition">
            <h4 className="font-semibold text-lg mb-2 text-indigo-500">
              Analytics
            </h4>
            <p className="text-gray-600">
              Turn your efforts into insights. Visualize progress, measure
              productivity, and unlock smarter ways to study.
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-8 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold mb-12">Choose your plan</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8">
            <h4 className="font-bold text-xl mb-4">Free</h4>
            <p className="mb-6 text-gray-600">
              Basic features for individuals.
            </p>
            <Button variant="primary" fullWidth>
              Get Started
            </Button>
          </Card>
          <Card className="p-8 border-2 border-indigo-600">
            <h4 className="font-bold text-xl mb-4 text-indigo-600">Pro</h4>
            <p className="mb-6 text-gray-600">Advanced features for teams.</p>
            <Button variant="primary" fullWidth>
              Start Free Trial
            </Button>
          </Card>
          <Card className="p-8">
            <h4 className="font-bold text-xl mb-4">Enterprise</h4>
            <p className="mb-6 text-gray-600">
              Custom solutions for organizations.
            </p>
            <Button variant="outline" fullWidth>
              Contact Us
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="mt-auto py-6 text-center text-gray-500 text-sm bg-gray-100"
      >
        <p>© {new Date().getFullYear()} TaskRhythm. All rights reserved.</p>
      </footer>
    </div>
  );
}
