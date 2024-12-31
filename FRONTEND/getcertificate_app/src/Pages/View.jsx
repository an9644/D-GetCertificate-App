import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import bg from '../assets/Images/certi.png';

const View = () => {
  const location = useLocation();
  const { name, course, grade, date } = location.state || {
    name: 'N/A',
    course: 'N/A',
    grade: 'N/A',
    date: 'N/A',
  };

  return (
    <>
      <div className="bg-blue-100 h-screen">
        <div className="flex justify-center text-2xl font-semibold">
          <label className="mt-44">Kerala Blockchain Academy</label>
        </div>
        <div className="mt-8 flex justify-center">
          <img src={bg} width="150" height="150" alt="Certificate Logo" />
        </div>
        <div className="mt-4 flex justify-center">
          <span>
            This is to certify that <b>{name}</b>
          </span>
        </div>
        <div className="mt-4 flex justify-center">
          <span>
            has successfully completed <b>{course}</b>
          </span>
        </div>
        <div className="mt-4 flex justify-center">
          <span>
            with <b>{grade}</b> on <b>{date}</b>
          </span>
        </div>
        <div className="mt-4 flex justify-center">
          <Link to="/" className="text-blue-500">
            Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default View;
