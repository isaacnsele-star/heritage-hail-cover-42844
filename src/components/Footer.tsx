const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Heritage Ad Solutions</h3>
          <p className="text-primary-foreground/80 mb-4">
            Providing peace of mind for eHailing drivers and their families
          </p>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Heritage Ad Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
