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
