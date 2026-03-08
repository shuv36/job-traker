const API_ALL = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const API_SINGLE = "https://phi-lab-server.vercel.app/api/v1/lab/issue/"

const API_SEARCH = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q="

const loginPage = document.getElementById("loginPage")

const mainPage = document.getElementById("mainPage")

const container = document.getElementById("issuesContainer")
const issueCount = document.getElementById("issueCount")

const loader = document.getElementById("loader")

let issues = []
let currentTab = "all"


window.onload = () => {
document.getElementById("modal").close()
}


