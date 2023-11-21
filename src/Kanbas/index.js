import { Route, Routes, Navigate } from "react-router";
import KanbasNavigation from "./KanbasNavigation";
import Courses from "./Courses";
import Account from "./Account";
import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

function Kanbas() {
   const [courses, setCourses] = useState([]);
   const [course, setCourse] = useState({
      name: "",
      number: "",
      startDate: "",
      endDate: "",
   });
   // const URL = "http://localhost:4000/api/courses";
   const API_BASE = process.env.REACT_APP_API_BASE;
   const URL = `${API_BASE}/courses`;

   const updateCourse = async () => {
      const response = await axios.put(
         `${URL}/${course._id}`,
         course
      );

      setCourses(
         courses.map((c) => {
            if (c._id === course._id) {
               return course;
            } else {
               return c;
            }
         })
      );
      setCourse({ name: "" });
   };
   const deleteCourse = async (courseId) => {
      try {
         await axios.delete(`${URL}/${courseId}`);
         // If the deletion on the server is successful, update the state
         setCourses(courses.filter((c) => c._id !== courseId));
      } catch (error) {
         // Handle any errors that occur during the deletion process
         console.error('Error deleting course:', error);
         // You might want to add additional error handling logic here
      }
   };

   const addCourse = async () => {
      const response = await axios.post(URL, course);
      setCourses([
         response.data,
         ...courses,
      ]);
      setCourse({ name: "" });
   };

   const findAllCourses = async () => {
      const response = await axios.get(URL);
      setCourses(response.data);
   };
   useEffect(() => {
      findAllCourses();
   }, []);

   // const updateCourse = () => {
   //    setCourses(
   //       courses.map((c) => {
   //          if (c._id === course._id) {
   //             return course;
   //          } else {
   //             return c;
   //          }
   //       })
   //    );
   // };

   // const addCourse = () => {
   //    setCourses([
   //       ...courses,
   //       {
   //          ...course,
   //          _id: new Date().getTime(),
   //       },
   //    ]);
   // };

   // const deleteCourse = (courseId) => {
   //    setCourses(courses.filter((c) => c._id !== courseId));
   // };

   return (
      <Provider store={store}>
         <div className="d-flex">
            <KanbasNavigation />
            <div>
               <Routes>
                  <Route path="/" element={<Navigate to="Dashboard" />} />
                  <Route path="Account" element={<Account />} />
                  <Route path="Dashboard" element={
                     <Dashboard
                        courses={courses}
                        course={course}
                        setCourse={setCourse}
                        addNewCourse={addCourse}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse} />
                  } />
                  <Route path="Courses" element={<Navigate to="RS101/Home" />} />
                  <Route path="Courses/:courseId/*" element={
                     <Courses courses={courses} />
                  } />
                  <Route path="Calendar" element={<h1>Calendar</h1>} />
               </Routes>
            </div>
         </div>
      </Provider>
   );
}
export default Kanbas;