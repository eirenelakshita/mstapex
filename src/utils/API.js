import axios from "axios";

const BASEURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const APIKEY = "&units=metric&appid=b0d00a3f19310077f04a39df76eef0ab";

export default {
  search: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  }
};