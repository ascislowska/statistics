import axios from 'axios';

export default axios.create({
    baseURL: 'https://bdl.stat.gov.pl/api/v1', 

    // headers: {'X-ClientId': 'f38d35e5-69a3-4093-675b-08d9b66b2bd3'},
}) 