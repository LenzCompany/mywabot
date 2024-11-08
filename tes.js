import axios from "axios"

const data = await axios.get(`https://widipe.com/sshp?url=https%3A%2F%2Fgoogle.com`)

console.log(data)