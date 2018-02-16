const limit = 5;

const searchURL = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&limit="+limit+"&format=json&search=";
const contentURL = 'https://en.wikipedia.org/w/api.php?&origin=*&action=query&prop=revisions&rvprop=content&format=json&titles=';

wiki_fetch('java')


async function wiki_fetch(term) {
 const data = await data_fetch(term);
 console.log(data[0]);
 const content = await content_fetch(data[0].title)
const info =  content.query.pages[Object.keys(content.query.pages)[0]].revisions[0];
console.log(info);
}

async function data_fetch(term) {
    try{
        const url = searchURL+term;
        let resp = await fetch(url);
        let db = await resp.json();
        //console.log(db);
        let data = [];
        for (let i = 0; i < limit; i++) {
            data.push({
                title: db[1][i],
                desc: db[2][i],
                webpage: db[3][i]
            });
        }
        return data;
    }catch(err){
        console.log(err);
    }
}

async function content_fetch(title) {
    try{
        const url = contentURL+title;
        let resp = await fetch(url);
        let db = await resp.json();
        console.log(db);

    }catch(err){
        console.log(err);
    }
}



