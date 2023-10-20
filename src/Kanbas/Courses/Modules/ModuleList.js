import React from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import "./index.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { PiDotsSixVerticalBold } from "react-icons/pi";

function ModuleList() {
    const { courseId } = useParams();
    const modules = db.modules;

    return (
        <ul className="list-group course-modules">
            {modules
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="list-group-item-title" style={{ marginBottom: "20px" }}>
                        <div className="module-header" style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <PiDotsSixVerticalBold />
                                <h3>{module.name}</h3>
                                <p>{module.description}</p>
                            </div>
                            <div className="icons">
                                <BsFillCheckCircleFill className="check-icon" />
                                <IoEllipsisVerticalSharp className="dots-icon" />
                            </div>
                        </div>
                        {module.lessons && (
                            <ul className="list-group">
                                {module.lessons.map((lesson, lessonIndex) => (
                                    <li key={lessonIndex} className="list-group-item" style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div className="lesson-header">
                                            <h4>{lesson.name}</h4>
                                            <p>{lesson.description}</p>
                                        </div>
                                        <div className="icons">
                                            <BsFillCheckCircleFill className="check-icon" />
                                            <IoEllipsisVerticalSharp className="dots-icon" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
        </ul>
    );
}

export default ModuleList;
