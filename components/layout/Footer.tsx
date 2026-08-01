import Container from "./Container";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-10 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-xl font-bold">
              <span className="text-blue-700">Geo</span>
              <span className="text-red-600">Scope</span>
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Understand the world, not just the headlines.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 GeoScope. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;