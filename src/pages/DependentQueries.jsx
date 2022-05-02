import React from "react";

import axios from "axios";
import { useQuery } from "react-query";

export default function DependentQueries() {
  const id = 1;

  const fetchUserById = (id) => {
    return axios.get(`http://localhost:4000/users/${id}`);
  };

  const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`);
  };

  const { data: user } = useQuery(["user", id], () => fetchUserById(id));
  const channelId = user?.data.channelId;

  const { data: courses, isLoading } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dependent Queries</h1>
      {courses?.data.courses?.map((course) => {
        return <div key={course.id}>{course}</div>;
      })}
    </div>
  );
}
