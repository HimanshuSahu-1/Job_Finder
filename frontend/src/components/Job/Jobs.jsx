// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { Context } from "../../main";

// const Jobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const { isAuthorized } = useContext(Context);
//   const navigateTo = useNavigate();
//   useEffect(() => {
//     try {
//       axios
//         .get("http://localhost:4000/api/v1/job/getall", {
//           withCredentials: true,
//         })
//         .then((res) => {
//           setJobs(res.data);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);
//   if (!isAuthorized) {
//     navigateTo("/");
//   }

//   return (
//     <section className="jobs page">
//       <div className="container">
//         <h1>ALL AVAILABLE JOBS</h1>
//         <div className="banner">
//           {jobs.jobs &&
//             jobs.jobs.map((element) => {
//               return (
//                 <div className="card" key={element._id}>
//                   <p>{element.title}</p>
//                   <p>{element.category}</p>
//                   <p>{element.country}</p>
//                   <Link to={`/job/${element._id}`}>Job Details</Link>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Jobs;


import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    } else {
      fetchJobs();
    }
  }, [isAuthorized]);

  const fetchJobs = () => {
    try {
      const url = "http://localhost:4000/api/v1/job/getall";
      const params = {};
      if (cityFilter) {
        params.city = cityFilter;
      }
      if (titleFilter) {
        params.title = titleFilter;
      }
      axios
        .get(url, {
          params,
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = (event) => {
    setCityFilter(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitleFilter(event.target.value);
  };

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="City"
            value={cityFilter}
            onChange={handleCityChange}
          />
          <input
            type="text"
            placeholder="Title"
            value={titleFilter}
            onChange={handleTitleChange}
          />
          <button onClick={fetchJobs}>Filter</button>
        </div>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
