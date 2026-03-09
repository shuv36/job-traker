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


function login() {



    const user = document.getElementById("username").value.trim()


    const pass = document.getElementById("password").value.trim()

    if (user === "admin" && pass === "admin123") {


        loginPage.style.display = "none"
        mainPage.style.display = "block"


        loadIssues()

    } else {

        alert("Invalid Credentials")

    }

}


async function loadIssues() {

    loader.classList.remove("hidden")
    const res = await fetch(API_ALL)
    const data = await res.json()

    issues = data.data

    renderIssues(issues)

    loader.classList.add("hidden")

}



function renderIssues(list) {

    container.innerHTML = ""

    issueCount.innerText = list.length

    list.forEach(issue => {

        const border =
            issue.status === "open"
                ? "border-green-500"
                : "border-purple-500"

        const card = document.createElement("div")

        card.className =
            `bg-white border-t-4 ${border} p-4 rounded shadow hover:shadow-lg transition cursor-pointer`
        card.innerHTML = `

<div class="flex justify-between items-center mb-3">

<div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
●
</div>

<span class="text-xs px-3 py-1 rounded-full 
${issue.priority === "high" ? "bg-red-100 text-red-600" :
                issue.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-gray-100 text-gray-600"}">
${issue.priority?.toUpperCase()}
</span>

</div>

<h3 class="font-semibold text-sm mb-2">
${issue.title}
</h3>

<p class="text-sm text-gray-500 mb-4">
${issue.description.slice(0, 80)}...
</p>

<div class="flex gap-2 mb-4">

<span class="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
BUG
</span>

<span class="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
HELP WANTED
</span>

</div>

<div class="border-t pt-3 text-xs text-gray-400">

<p>#${issue.id} by ${issue.author}</p>

<p>1/15/2024</p>

</div>

`

        card.onclick = () => openIssue(issue)

        container.appendChild(card)

    })

}


function setTab(tab) {

    currentTab = tab

    document.getElementById("tabAll").classList.remove("bg-purple-600", "text-white")


    document.getElementById("tabOpen").classList.remove("bg-purple-600", "text-white")

    document.getElementById("tabClosed").classList.remove("bg-purple-600", "text-white")

    if (tab === "all") document.getElementById("tabAll").classList.add("bg-purple-600", "text-white")
    if (tab === "open") document.getElementById("tabOpen").classList.add("bg-purple-600", "text-white")

    if (tab === "closed") document.getElementById("tabClosed").classList.add("bg-purple-600", "text-white")

    if (tab === "all") {

        renderIssues(issues)

    } else {


        const filtered = issues.filter(i => i.status === tab)

        renderIssues(filtered)

    }

}


function openIssue(issue){

    const today = new Date().toLocaleDateString("en-GB")

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDesc").innerText = issue.description
document.getElementById("modalAssignee").innerText = issue.author
document.getElementById("modalAssigneeName").innerText = issue.author
document.getElementById("modalDate").innerText = today
document.getElementById("modalPriority").innerText = issue.priority

const statusEl = document.getElementById("modalStatus")

statusEl.innerText = issue.status

if(issue.status === "open"){
statusEl.className =
"px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
}
else{
statusEl.className =
"px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
}

document.getElementById("modal").showModal()

}


function closeModal() {
    document.getElementById("modal").close()
}


document.getElementById("searchInput")


    .addEventListener("keyup", async e => {



        const text = e.target.value

        if (text.length < 2) {

            setTab(currentTab)
            return
        }
        const res = await fetch(API_SEARCH + text)

        const data = await res.json()
        renderIssues(data.data)


    })

