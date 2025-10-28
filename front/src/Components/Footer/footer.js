import './footer.css'

const Footer = () => {
  return (
    <>
      <footer className="footer-section">
        <div className="section-content">
          <p className="copyright-text">2024 - Rampage Store</p>
          <div className="social-link-list">
            <button
              onClick={() => {
                /* ação desejada */
              }}
              className="social-link"
            >
              <i className="fa-brands fa-facebook"> </i>
            </button>
            <button
              onClick={() => {
                /* ação desejada */
              }}
              className="social-link"
            >
              <i className="fa-brands fa-instagram"> </i>
            </button>
            <button
              onClick={() => {
                /* ação desejada */
              }}
              className="social-link"
            >
              <i className="fa-brands fa-whatsapp"> </i>
            </button>
          </div>
          <p className="policy-text">
            <button
              onClick={() => {
                /* ação desejada */
              }}
              className="policy-link"
            >
              Privacy policy
            </button>
            <span className="separator">•</span>
            <button
              onClick={() => {
                /* ação desejada */
              }}
              className="policy-link"
            >
              Refund policy
            </button>
          </p>
        </div>
      </footer>
    </>
  );
};


export default Footer;