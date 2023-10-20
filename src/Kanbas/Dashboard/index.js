import db from "../Database";
import { Link } from "react-router-dom";
// import { BsFileEarmarkText } from "react-icons/bs";
import "./index.css";
import backgroundImg from "./background.jpg";

function Dashboard() {
    const courses = db.courses;

    return (
        <div>
            <h2>Dashboard</h2>
            <hr />
            <h3 className="h3-margin-left">Published Courses ({courses.length})</h3>
            <hr />
            <div className="courses-grid d-flex flex-row flex-wrap">
                {courses.map((course, index) => (
                    <div className="card" style={{ maxWidth: '260px' }}>
                        <div className="card-image" style={{ backgroundImage: `url(${backgroundImg})`, height: '150px' }}>

                        </div>
                        <div className="card-body">
                            <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="no-underline">
                                <h5 className="card-title">{course.name}</h5>
                            </Link>
                            <p className="card-term">{course.number}</p>
                            <p className="card-year">{course.startDate}</p>
                            <p className="card-year">{course.endDate}</p>
                            {/* <BsFileEarmarkText className="icon" /> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
