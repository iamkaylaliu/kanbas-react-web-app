import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import "./index.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import AssignmentButtons from "./AssignmentButtons";

function Assignments() {
    const { courseId } = useParams();
    const assignments = db.assignments;
    const courseAssignments = assignments.filter((assignment) => assignment.course === courseId);

    return (
        <div>
            <AssignmentButtons />
            <ul className="list-group course-modules">
                <li className="list-group-item-title">
                    <div className="module-header" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <PiDotsSixVerticalBold />
                            <h3>
                                Assignments for course {courseId}
                            </h3>
                        </div>
                        <div className="icons">
                            <BsFillCheckCircleFill className="check-icon" />
                            <IoEllipsisVerticalSharp className="dots-icon" />
                        </div>
                    </div>
                </li>
                <div className="list-group">
                    {courseAssignments.map((assignment) => (
                        <li key={assignment._id} className="list-group-item">
                            <div className="module-header" style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>
                                        <PiDotsSixVerticalBold />
                                        <h3>{assignment.title}</h3>
                                    </Link>
                                    <p>{assignment.description}</p>
                                </div>
                                <div className="icons">
                                    <BsFillCheckCircleFill className="check-icon" />
                                    <IoEllipsisVerticalSharp className="dots-icon" />
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
}

export default Assignments;
