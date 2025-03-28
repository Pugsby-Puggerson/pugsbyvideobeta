var list
fetch('./videos/list.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        list = data
        var listNew = document.getElementById("listNew")
        list.new.forEach(item => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const p = document.createElement('p');
            const dataJsonUrl = `videos/${item}/data.json`
            var dataJson
            fetch(dataJsonUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    dataJson = data;
                    console.log(dataJson.thumbnail)
                    img.src = `videos/${item}/${dataJson.thumbnail}`;
                    p.textContent = dataJson.name;
                    console.log(dataJson.timelength);
                    var timeLength = document.createElement('div');
                    timeLength.classList.add("timeLength");
                    timeLength.innerText = dataJson.timelength;
                    div.insertBefore(timeLength, div.firstChild);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            img.width = 256;
            img.height = 144.52;
            div.onclick = function() {
                window.location = `videoPlayer.html?id=${item}`;
            };
            div.appendChild(img);
            div.appendChild(p);
            listNew.appendChild(div);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    function duplicateImage() {
        document.getElementById("ylwvdy").innerHTML = "oh god, they're multiplying"
        const original = document.getElementById('vwImg');
        const clone = original.cloneNode(true);
        clone.id = ''; // Remove id to avoid duplicate IDs
        document.body.appendChild(clone);
        const clones = document.querySelectorAll('.vwImg');
        clones.forEach(clone => {
            clone.style.width = Math.max(130 - clones.length * 0.1, 10) + "px";
        });
    }