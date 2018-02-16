const limit = 5;

const searchURL = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&limit=" + limit + "&format=json&search=";
const contentURL = 'https://en.wikipedia.org/w/api.php?&origin=*&action=query&prop=revisions&rvprop=content&format=json&titles=';

wiki_fetch('javascript').then((r) => {
    console.log(r);
});


async function wiki_fetch(term) {
    let result = [];
    const data = await data_fetch(term);
    for (let i = 0; i < limit; i++) {
        const content = await content_fetch(data[i].title);
        const page = content.query.pages;
        const pageID = Object.keys(page)[0];
        const info = page[pageID].revisions[0]['*'];
        result[i] = {
            title: data[i].title,
            desc: data[i].desc,
            webpage: data[i].webpage,
            content: info 
        };
    }
    
    return result;
}

async function data_fetch(term) {
    try {
        const url = searchURL + term;
        let resp = await fetch(url);
        let db = await resp.json();
        let data = [];
        for (let i = 0; i < limit; i++) {
            data.push({
                title: db[1][i],
                desc: db[2][i],
                webpage: db[3][i]
            });
        }
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function content_fetch(title) {
    try {
        const url = contentURL + title;
        let resp = await fetch(url);
        let db = await resp.json();
        return db;
    } catch (err) {
        console.log(err);
    }
}



