const axios = require("axios");

const url = "https://akashraj.tech/corona/api_india";

//given api not working for particular date, so used another api
//const url = "https://api.covid19india.org/v4/data.json";

export const fetchData = async () => {
  try {
    const {
      data: {
        total_values: { confirmed, deaths, recovered, lastupdatedtime },
      },
    } = await axios.get(`${url}`);
    return { confirmed, deaths, recovered, lastupdatedtime };
  } catch (error) {
    console.log(error);
  }
};

export const fetchStates = async (state) => {
  try {
    const {
      data: { state_wise },
    } = await axios.get(`${url}`);

    const stateArray = Object.values(state_wise);
    if (state) {
      return stateArray.find((states) => states.state === state);
    } else {
      return stateArray.map((states) => states.state);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    return error;
  }
};
