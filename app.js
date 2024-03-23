const base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("#btnConvert")
const fromCurr = document.querySelector("#convertfrom")
const toCurr = document.querySelector("#convertto")
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currcode;
        newOption.value = currcode
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && currcode === "INR") {
            newOption.selected = "elected"
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1
        amount.value = "1"
    }
    const URL = `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    console.log(URL)
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    console.log(rate)
    console.log(amtVal)
    let finalAmount = amtVal * rate
    msg.innerText = `${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`

})
