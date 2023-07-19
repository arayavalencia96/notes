export default function Footer() {
  const encEmail = "YXJheWF2YWxlY2lhOTZAZ21haWwuY29t";
  return (
    <div className="footer flex items-center justify-between bg-primary p-2 text-primary-content">
      <div className="grid-flow-col items-center">
        <p>Copyright © 2023 - All right reserved by Axel Araya</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://www.linkedin.com/in/arayavalencia/" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="fill-current"
            viewBox="0 0 448 512"
          >
            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
          </svg>
        </a>
        <a
          id="contact"
          href=""
          ref={(node) => {
            if (node) {
              const form = document.getElementById(
                "contact"
              ) as HTMLAnchorElement;
              form.setAttribute("href", "mailto:".concat(atob(encEmail)));
            }
          }}
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="fill-current"
            viewBox="0 0 512 512"
          >
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
