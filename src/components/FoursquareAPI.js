function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const getAllPlaces = () =>
  fetch(
    `https://api.foursquare.com/v2/venues/search?ll=38.5815719,-121.4943996 &intent=browse &radius=80000 &query=restaurant &limit=15 &client_id=13NMJUKYWBYYNB0HBTE3RLBOUGPHMBPMCAZSHERCLELQM1KI &client_secret=BVCDZKSXP4NNSV12TGX2YCXWETSXN3HG455LNKCKKSKBCO04 &v=20180912`
  )
    .then(handleErrors)
    .then(res => res.json())
    .then(data => data.response.venues);
