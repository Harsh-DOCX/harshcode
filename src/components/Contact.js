export default function Contact() {
    return (
        <>
            <div className="contact">
                <div className="container">
                    <div className="main">
                        <div className="textContainer">
                            <h2 className="mb-3 fw-bold">
                                lets Connect
                            </h2>
                            <p className="mb-4">
                                I'd love to hear from you — whether it's a project idea, a
                                suggestion, or just a friendly hello. Feel free to reach out using
                                the social links on the right.
                            </p>
                            <ul className='list-unstyled'>
                                <li className='mb-2'>
                                    <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                                    Noida, India
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-envelope me-2 text-primary"></i>
                                    harshjadon9098@gmail.com
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-6 linkContainer">
                            <div className="links">
                                <a
                                    href="https://www.instagram.com/harsh_._exe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-danger d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill linkBtn"
                                >
                                    <i className="fab fa-instagram fs-5"></i> Instagram
                                </a>

                                <a
                                    href="mailto:harshjadon9098@gmail.com"
                                    className="btn btn-outline-primary d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill linkBtn"
                                >
                                    <i className="fas fa-envelope fs-5"></i> Email
                                </a>

                                <a
                                    href="https://twitter.com/harsh_5643"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-info d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill linkBtn"
                                >
                                    <i className="fab fa-twitter fs-5"></i> Twitter
                                </a>

                                <a
                                    href="https://github.com/Harsh-DOCX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-dark d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill linkBtn"
                                >
                                    <i className="fab fa-github fs-5"></i> GitHub
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/harsh-jadon-918a1835b"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill linkBtn"
                                >
                                    <i className="fab fa-linkedin fs-5"></i> LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
