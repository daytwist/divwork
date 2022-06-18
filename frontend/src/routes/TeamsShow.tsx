// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { axiosInstance } from "../utils/axios";

// type Team = {
//   id: string;
//   name: string;
// };

const TeamsShow: React.FC = () => {
  // const [team, setTeam] = useState<Team[]>([]);
  // const params: {teamId: string} = useParams();

  // useEffect(() => {
  //   axiosInstance
  //     .get<Team[]>(`/teams/${params.id}`)
  //     .then((res) => {
  //       setTeam(res.data);
  //     })
  //     .catch((e) => console.error(e));
  // }, []);

  return (
    <div>
      <h1>Teams Show</h1>
      {/* <h2>{params.id}</h2>
      <h2>{team?.name}</h2> */}
    </div>
  );
};

export default TeamsShow;
