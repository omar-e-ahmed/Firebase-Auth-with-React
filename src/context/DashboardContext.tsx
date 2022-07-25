import React, { useContext, useState, useEffect } from "react";
// import { Dashboard } from "../types/motionTypes";
// import { meeting } from "../_mock/dummy";

const DashboardContext = React.createContext<any | undefined>(undefined);
export function useDashboard() {
  return useContext(DashboardContext);
}

const fetchData = () => {
  return "meeting";
};

type Props = {
  children: React.ReactNode;
  id: string;
};
export function DashboardProvider({ children, id }: Props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [meetingData, setDashboardData] = useState<any>({
    id: "",
    motions: [],
    voters: [],
    setting: {},
    information: "",
  });

  useEffect(() => {
    const fetch = fetchData();
    setDashboardData(fetch);
    setLoading(false);
  }, []);

  const value = {
    meetingData,
  };

  return (
    <DashboardContext.Provider value={value}>
      {!loading && children}
    </DashboardContext.Provider>
  );
}
