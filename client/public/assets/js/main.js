function download() {
    for (element of document.querySelectorAll('[submit]')) {
        element.children[0].classList.add('d-none')
        element.children[1].classList.remove('d-none')
        element.disabled = true
    }
    download_btn = document.getElementById('download_button')
    form = get_download_form()
    down_element = document.getElementById('download_list')
    // if (document.getElementById('download_list').classList.contains('show')){
    //   down_element.classList.add('hidden')
    //   down_element.classList.remove('show')
    // }
    fetch("/", {
        method: "POST",
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
        body: form
    }).then(function(res) {
        res
            .json()
            .then(function(result) {
                document.querySelectorAll('input')[1].scrollIntoView({
                    behavior: 'smooth'
                })
                down_element.classList.remove('hidden')
                down_element.classList.add('show')
                down_element.innerHTML = result.template

                for (element of document.querySelectorAll('[submit]')) {
                    element.children[0].classList.remove('d-none')
                    element.children[1].classList.add('d-none')
                    element.disabled = false
                }
            })
    })
}

function get_download_form() {
    url = document
        .getElementsByName('v')[0]
        .value
    console.log(url)
    let form = new FormData()
    form.append('url', url)
    form.append(
        'csrfmiddlewaretoken',
        document.getElementsByName('csrfmiddlewaretoken')[0].value
    )
    return form
}
document.getElementById('download_list').addEventListener('click', function(event) {
    if (event.target && event.target.matches('button[pagination]')) {
        event.preventDefault();
        for (btn of document.querySelectorAll('[hidden]')) {
            if (event.target.innerText == 'More') {
                btn.classList.remove('d-none')
            } else {
                btn.classList.add('d-none')
            }
        }
        document.getElementById('download_view').scrollIntoView({
            behavior: 'smooth'
        })
        event.target.innerText = event.target.innerText == 'More' ? "Less" : "More";
    }

});

let shortCode = null;
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('v')) {
    shortCode = urlParams.get('v');
} else {
    const path = window.location.pathname;
    const parts = path.split('/');
    if (parts[1] === 'shorts') {
        shortCode = parts[2];
    }
}
console.log(shortCode)
if (shortCode) {
    document.getElementsByName('v')[0].value = `https://youtube.com/?v=${shortCode}`;
    document.getElementById('dlfr').submit()
    document.querySelectorAll('input')[1].scrollIntoView({
        behavior: 'smooth'
    })
}