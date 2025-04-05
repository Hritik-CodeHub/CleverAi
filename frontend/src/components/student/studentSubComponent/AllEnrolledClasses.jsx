import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllEnrolledClasses.css"; // Import CSS file
import { Link } from "react-router-dom";
function AllEnrolledClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/st/allEnrldClasses`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        if (response.data.success) {
          setClasses(response.data.classes.enrolledClasses);
        } else {
          setError("Failed to load classes.");
        }
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledClasses();
  }, []);
  return (
    <div className="allenrolledclasses-container">
      <h2 className="allenrolledclasses-h2">My Enrolled Classes</h2>

      {loading && <p className="allenrolledclasses-loading">Loading...</p>}
      {error && <p className="allenrolledclasses-error">{error}</p>}

      <div className="allenrolledclasses-list">
        {classes.length > 0 ? (
          classes.map((classItem ,i) => (
            <Link to={`/student/class/${classItem._id}`} key={classItem._id || i} >
              <div  className="allenrolledclasses-card">
                <h3 className="allenrolledclasses-classname">{classItem.name}</h3>
                <p className="allenrolledclasses-teacher">
                  <strong>Teacher:</strong> {classItem.teacher}
                </p>
                <p className="allenrolledclasses-students">
                  <strong>Students:</strong> {classItem.students.length}
                </p>
                <p className="allenrolledclasses-papers">
                  <strong>Papers:</strong> {classItem.papers.length}
                </p>
              </div></Link>
          ))
        ) : (
          !loading && <p className="allenrolledclasses-no-classes">No enrolled classes found.</p>
        )}
      </div>
    </div>
  );
}

export default AllEnrolledClasses;
