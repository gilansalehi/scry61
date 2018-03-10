export default function fetchAllSets() {
  return fetch('https://mtgjson.com/json/SetCodes.json')
    .then(response => response.json())
    .then(setCodes => setCodes.map(code => {
      return fetch(`https://mtgjson.com/json/${code}.json`)
        .then(response => response.json());
    })
    )
    .then(setData => Promise.all(setData))
    .catch(err => console.log(err));
}

export function buildCardData() {
  console.log('noop');
}

export function fetchASet() {
  return fetch('https://mtgjson.com/json/SetCodes.json')
    .then(response => response.json())
    .then(setCodes => {
      return fetch(`https://mtgjson.com/json/${setCodes[0]}.json`)
        .then(response => response.json());
    })
    .then(setData => {
      return [setData];
    })
    .catch(err => console.log(err));
}