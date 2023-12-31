import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./modulesReducer";
import * as client from "./client";
import "./index.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { PiDotsSixVerticalBold } from "react-icons/pi";

function ModuleList() {
    const { courseId } = useParams();
    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);
    const dispatch = useDispatch();
    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    const handleDeleteModule = (moduleId) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        console.log('Module update status:', status);
        dispatch(updateModule(module));
    };

    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId, dispatch]);

    return (
        <ul className="list-group course-modules">
            <li className="list-group-item">
                <div className="input-group">
                    <input className="input-field" value={module.name}
                        onChange={(e) =>
                            dispatch(setModule({ ...module, name: e.target.value }))
                        } />

                    <textarea className="input-field" value={module.description}
                        onChange={(e) =>
                            dispatch(setModule({ ...module, description: e.target.value }))
                        } />

                    <div className="button-group">
                        <button className="btn btn-success"
                            onClick={handleAddModule}>
                            Add
                        </button>
                        <button className="btn btn-primary"
                            onClick={handleUpdateModule}>
                            Update
                        </button>
                    </div>
                </div>
            </li>

            {modules
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="list-group-item-title" style={{ marginBottom: "20px" }}>
                        <div className="module-header" style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="content">
                                <PiDotsSixVerticalBold />
                                <h3>{module.name}</h3>
                                <p>{module.description}</p>
                                {/* <p>{module._id}</p> */}
                            </div>
                            <div>
                                <button className="btn btn-warning"
                                    onClick={() => dispatch(setModule(module))}>
                                    Edit
                                </button>
                                <button className="btn btn-danger"
                                    onClick={() => handleDeleteModule(module._id)}>
                                    Delete
                                </button>
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
