export default function Home() {

  // fetch("https://api.youyong.ba/list?page=1&keyword=", )
var obj = 'aaa';
  let res = fetch("https://api.youyong.ba/list?page=1&keyword=", {
    method: 'GET',
    // mode: 'cors',
    // cache: 'force-cache',

    headers: {
        'Cache-Control': 'no-cache',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxx'
    }

    // cache: 'default',
    // body: toQueryString(data)
    // body: toQueryString(data)
}).then(res=> res.json()).then(data => {
  obj = data
});



// let json = await res.json();

// console.log(json, "jsonjson");

return (<div>Next-Offline Example, try to install app via chrome {obj} </div>)
}
