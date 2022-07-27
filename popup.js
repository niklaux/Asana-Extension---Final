function generateContent() {

    chrome.storage.sync.get(['data'], function(result) {
        let items = '';
        let listStart = '<li class="list-group-item d-flex justify-content-between align-items-center">';
        let listEnd = '</li>';
        let spanStart = '<span class="badge badge-primary badge-pill">';
        let spanEnd = ' hours</span>';

        let finalList = JSON.parse(JSON.stringify(result.data));
        console.log(finalList[0].name);

        for (let i = 0; i < finalList.length; i++) {
            if (finalList[i].name == '') {
                continue;
            } else {
                items += listStart + finalList[i].name + spanStart + finalList[i].hours + spanEnd + listEnd;
            }
        }

        $('#mainContent').html(items);

    });

   
}
generateContent();
// setInterval(function() {generateContent()}, 500);
